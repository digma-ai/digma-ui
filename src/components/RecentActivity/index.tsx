import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { addPrefix } from "../../utils/addPrefix";
import { groupBy } from "../../utils/groupBy";
import { actions as globalActions } from "../common/App";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import * as s from "./styles";
import {
  EntrySpan,
  RecentActivityData,
  RecentActivityProps,
  SetIsJaegerData
} from "./types";

const documentationURL =
  typeof window.recentActivityDocumentationURL === "string"
    ? window.recentActivityDocumentationURL
    : null;

const ACTION_PREFIX = "RECENT_ACTIVITY";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_DATA: "SET_DATA",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_TRACE: "GO_TO_TRACE"
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

export const RecentActivity = (props: RecentActivityProps) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>();
  const [data, setData] = useState<RecentActivityData>();
  const previousSelectedEnvironment = usePrevious(selectedEnvironment);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [isJaegerEnabled, setIsJaegerEnabled] = useState(
    window.isJaegerEnabled === true
  );

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleRecentActivityData = (data: unknown) => {
      setData(data as RecentActivityData);
    };

    const handleSetIsJaegerEnabledData = (data: unknown) => {
      setIsJaegerEnabled((data as SetIsJaegerData).isJaegerEnabled);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleRecentActivityData);
    dispatcher.addActionListener(
      globalActions.SET_IS_JAEGER_ENABLED,
      handleSetIsJaegerEnabledData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA,
        handleRecentActivityData
      );
      dispatcher.removeActionListener(
        globalActions.SET_IS_JAEGER_ENABLED,
        handleSetIsJaegerEnabledData
      );
    };
  }, []);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (!previousSelectedEnvironment && data && data.environments.length) {
      setSelectedEnvironment(data.environments[0]);
    }
  }, [previousSelectedEnvironment, data]);

  const handleEnvironmentSelect = (environment: string) => {
    setSelectedEnvironment(environment);
  };

  const handleSpanLinkClick = (span: EntrySpan, environment: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        span,
        environment
      }
    });
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
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
          isTraceButtonVisible={isJaegerEnabled}
        />
      )}
    </s.Container>
  );
};
