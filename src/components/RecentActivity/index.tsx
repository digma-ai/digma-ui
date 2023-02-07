import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { getActions } from "../../utils/getActions";
import { groupBy } from "../../utils/groupBy";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { isRecent, RecentActivityTable } from "./RecentActivityTable";
import * as s from "./styles";
import { EntrySpan, RecentActivityData } from "./types";

const DOCUMENTATION_LINK =
  "https://github.com/digma-ai/digma-vscode-plugin#%EF%B8%8F-extension-settings";

const REFRESH_INTERVAL =
  typeof window.recentActivityRefreshInterval === "number"
    ? window.recentActivityRefreshInterval
    : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "RECENT_ACTIVITY";

const actions = getActions(ACTION_PREFIX, {
  getData: "GET_DATA",
  setData: "SET_DATA",
  goToSpan: "GO_TO_SPAN",
  goToTrace: "GO_TO_TRACE"
});

export const RecentActivity = () => {
  const [selectedEnv, setSelectedEnv] = useState<string>();
  const [data, setData] = useState<RecentActivityData>();
  const previousData = usePrevious(data);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.getData
    });
    const refreshInterval = setInterval(() => {
      window.sendMessageToDigma({
        action: actions.getData
      });
    }, REFRESH_INTERVAL);

    const handleRecentActivityData = (data: unknown) => {
      setData(data as RecentActivityData);
    };

    dispatcher.addActionListener(actions.setData, handleRecentActivityData);

    return () => {
      clearInterval(refreshInterval);

      dispatcher.addActionListener(actions.setData, handleRecentActivityData);
    };
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      if (data.envs.includes(data.currentEnv)) {
        setSelectedEnv(data.currentEnv);
      } else {
        setSelectedEnv(data.envs[0]);
      }
    }
  }, [previousData, data]);

  const handleEnvSelect = (env: string) => {
    setSelectedEnv(env);
  };

  const handleSpanLinkClick = (span: EntrySpan) => {
    window.sendMessageToDigma({
      action: actions.goToSpan,
      payload: {
        span
      }
    });
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    window.sendMessageToDigma({
      action: actions.goToTrace,
      payload: {
        traceId,
        span
      }
    });
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const envActivities = data ? groupBy(data.entries, "environment") : {};
  const envs = Object.keys(envActivities).map((env) => ({
    name: env,
    hasBadge: envActivities[env].some(isRecent)
  }));

  const renderNoData = () => {
    return (
      <s.NoDataContainer>
        <CursorFollower>
          <DigmaLogoFlatIcon size={64} />
        </CursorFollower>
        <s.NoDataTitle>No Recent Activity</s.NoDataTitle>
        <s.NoDataText>Check out our documentation to learn how to</s.NoDataText>
        <s.DocumentationLink
          href={DOCUMENTATION_LINK}
          rel={"noopener noreferrer"}
          target={"_blank"}
        >
          dig with digma
        </s.DocumentationLink>
      </s.NoDataContainer>
    );
  };

  return (
    <s.Container>
      <EnvironmentPanel
        envs={envs}
        viewMode={viewMode}
        selectedEnv={selectedEnv}
        onEnvSelect={handleEnvSelect}
        onViewModeChange={handleViewModeChange}
      />
      {!selectedEnv || !envActivities[selectedEnv].length ? (
        <>
          <s.Header>Recent Activity</s.Header>
          {renderNoData()}
        </>
      ) : (
        <RecentActivityTable
          viewMode={viewMode}
          data={envActivities[selectedEnv]}
          onSpanLinkClick={handleSpanLinkClick}
          onTraceButtonClick={handleTraceButtonClick}
        />
      )}
    </s.Container>
  );
};
