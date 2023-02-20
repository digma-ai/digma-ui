import { useEffect, useMemo, useState } from "react";
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

const documentationURL =
  typeof window.recentActivityDocumentationURL === "string"
    ? window.recentActivityDocumentationURL
    : null;

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

const renderNoData = () => {
  return (
    <s.NoDataContainer>
      <CursorFollower>
        <DigmaLogoFlatIcon size={64} />
      </CursorFollower>
      <s.NoDataTitle>No Recent Activity</s.NoDataTitle>
      {documentationURL && (
        <>
          <s.NoDataText>
            Check out our documentation to learn how to
          </s.NoDataText>

          <s.DocumentationLink
            href={documentationURL}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            dig with digma
          </s.DocumentationLink>
        </>
      )}
    </s.NoDataContainer>
  );
};

export const RecentActivity = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>();
  const [data, setData] = useState<RecentActivityData>();
  const previousSelectedEnvironment = usePrevious(selectedEnvironment);
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

      dispatcher.removeActionListener(
        actions.setData,
        handleRecentActivityData
      );
    };
  }, []);

  useEffect(() => {
    if (!previousSelectedEnvironment && data && data.environments.length) {
      setSelectedEnvironment(data.environments[0]);
    }
  }, [previousSelectedEnvironment, data]);

  const handleEnvironmentSelect = (environment: string) => {
    setSelectedEnvironment(environment);
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

  const environmentActivities = useMemo(
    () => (data ? groupBy(data.entries, "environment") : {}),
    [data]
  );

  const environments = useMemo(
    () =>
      data
        ? data.environments.map((environment) => ({
            name: environment,
            hasBadge: environmentActivities[environment]
              ? environmentActivities[environment].some(isRecent)
              : false
          }))
        : [],
    [data, environmentActivities]
  );

  return (
    <s.Container>
      <EnvironmentPanel
        environments={environments}
        viewMode={viewMode}
        selectedEnvironment={selectedEnvironment}
        onEnvironmentSelect={handleEnvironmentSelect}
        onViewModeChange={handleViewModeChange}
      />
      {!selectedEnvironment ||
      !environmentActivities[selectedEnvironment] ||
      !environmentActivities[selectedEnvironment].length ? (
        <>
          <s.Header>Recent Activity</s.Header>
          {renderNoData()}
        </>
      ) : (
        <RecentActivityTable
          viewMode={viewMode}
          data={environmentActivities[selectedEnvironment]}
          onSpanLinkClick={handleSpanLinkClick}
          onTraceButtonClick={handleTraceButtonClick}
        />
      )}
    </s.Container>
  );
};
