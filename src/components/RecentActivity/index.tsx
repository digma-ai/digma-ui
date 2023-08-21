import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { addPrefix } from "../../utils/addPrefix";
import { groupBy } from "../../utils/groupBy";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { LiveData } from "./LiveView/types";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import * as s from "./styles";
import { EntrySpan, RecentActivityData, RecentActivityProps } from "./types";

const ACTION_PREFIX = "RECENT_ACTIVITY";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_DATA: "SET_DATA",
  SET_LIVE_DATA: "SET_LIVE_DATA",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_TRACE: "GO_TO_TRACE",
  CLOSE_LIVE_VIEW: "CLOSE_LIVE_VIEW"
});

const handleTroubleshootButtonClick = () => {
  sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
    origin: "recent activity"
  });

  window.sendMessageToDigma({
    action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
  });
};

const renderNoData = () => {
  return (
    <s.NoDataContainer>
      <CursorFollower>
        <DigmaLogoFlatIcon size={64} />
      </CursorFollower>
      <s.NoDataTitle>No Recent Activity</s.NoDataTitle>
      <s.NoDataText>Not seeing your application data?</s.NoDataText>
      <s.TroubleshootButton onClick={handleTroubleshootButtonClick}>
        Troubleshoot
      </s.TroubleshootButton>
    </s.NoDataContainer>
  );
};

export const RecentActivity = (props: RecentActivityProps) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>();
  const [data, setData] = useState<RecentActivityData>();
  const previousSelectedEnvironment = usePrevious(selectedEnvironment);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [liveData, setLiveData] = useState<LiveData>();
  const config = useContext(ConfigContext);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleRecentActivityData = (data: unknown) => {
      setData(data as RecentActivityData);
    };

    const handleLiveData = (data: unknown) => {
      setLiveData(data as LiveData);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleRecentActivityData);
    dispatcher.addActionListener(actions.SET_LIVE_DATA, handleLiveData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA,
        handleRecentActivityData
      );
    };
  }, []);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.liveData) {
      setLiveData(props.liveData);
    }
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
    () => (data ? groupBy(data.entries, (x) => x.environment) : {}),
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
              isTraceButtonVisible={config.isJaegerEnabled}
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
