import { Allotment } from "allotment";
import "allotment/dist/style.css";
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
import { LiveView } from "./LiveView";
import { LiveData } from "./LiveView/types";
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
  SET_LIVE_DATA: "SET_LIVE_DATA",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_TRACE: "GO_TO_TRACE",
  CLOSE_LIVE_VIEW: "CLOSE_LIVE_VIEW"
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
  const [liveData, setLiveData] = useState<LiveData>();

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

    const handleLiveData = (data: unknown) => {
      setLiveData(data as LiveData);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleRecentActivityData);
    dispatcher.addActionListener(
      globalActions.SET_IS_JAEGER_ENABLED,
      handleSetIsJaegerEnabledData
    );
    dispatcher.addActionListener(actions.SET_LIVE_DATA, handleLiveData);

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
    if (!props.liveData) {
      return;
    }

    setLiveData(props.liveData);
  }, [props.liveData]);

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

  const handleCloseLiveView = (codeObjectId: string) => {
    setLiveData(undefined);
    window.sendMessageToDigma({
      action: actions.CLOSE_LIVE_VIEW,
      payload: {
        codeObjectId
      }
    });
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
      <Allotment defaultSizes={[70, 30]}>
        <s.RecentActivityContainer>
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
        </s.RecentActivityContainer>
        <Allotment.Pane visible={Boolean(liveData)} minSize={450}>
          {liveData && (
            <s.LiveViewContainer>
              <LiveView data={liveData} onClose={handleCloseLiveView} />
            </s.LiveViewContainer>
          )}
        </Allotment.Pane>
      </Allotment>
    </s.Container>
  );
};
