import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { addPrefix } from "../../utils/addPrefix";
import { groupBy } from "../../utils/groupBy";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { AddEnvironmentPanel } from "./AddEnvironmentPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { LiveData } from "./LiveView/types";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import * as s from "./styles";
import {
  EntrySpan,
  ExtendedEnvironment,
  RecentActivityData,
  RecentActivityProps
} from "./types";

export const RECENT_ACTIVITY_CONTAINER_ID = "recent-activity";

const ACTION_PREFIX = "RECENT_ACTIVITY";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_DATA: "SET_DATA",
  SET_LIVE_DATA: "SET_LIVE_DATA",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_TRACE: "GO_TO_TRACE",
  CLOSE_LIVE_VIEW: "CLOSE_LIVE_VIEW",
  ADD_ENVIRONMENT: "ADD_ENVIRONMENT",
  DELETE_ENVIRONMENT: "DELETE_ENVIRONMENT",
  ADD_ENVIRONMENT_TO_RUN_CONFIG: "ADD_ENVIRONMENT_TO_RUN_CONFIG"
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
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<ExtendedEnvironment>();
  const [data, setData] = useState<RecentActivityData>();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [liveData, setLiveData] = useState<LiveData>();
  const config = useContext(ConfigContext);

  const environmentActivities = useMemo(
    () => (data ? groupBy(data.entries, (x) => x.environment) : {}),
    [data]
  );

  const environments: ExtendedEnvironment[] = useMemo(
    () =>
      data
        ? data.environments.map((environment) => ({
            ...environment,
            hasRecentActivity: environmentActivities[environment.name]
              ? environmentActivities[environment.name].some(isRecent)
              : false
          }))
        : [],
    [data, environmentActivities]
  );

  useEffect(() => {
    setSelectedEnvironment((selectedEnvironment) => {
      const environmentToSelect = environments.find(
        (x) => x.name === selectedEnvironment?.name
      );

      if (environmentToSelect) {
        return environmentToSelect;
      }

      return environments[0];
    });
  }, [environments]);

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

  const handleEnvironmentSelect = (environment: ExtendedEnvironment) => {
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

  const handleEnvironmentAdd = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.ADD_ENVIRONMENT,
      payload: {
        environment
      }
    });

    // Set environment placeholder until the next data refresh
    setSelectedEnvironment({
      name: environment,
      isPending: true,
      hasRecentActivity: false,
      additionToConfigResult: null
    });
  };

  const handleEnvironmentDelete = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.DELETE_ENVIRONMENT,
      payload: {
        environment
      }
    });
  };

  const handleAddEnvironmentToRunConfig = () => {
    if (selectedEnvironment) {
      window.sendMessageToDigma({
        action: actions.ADD_ENVIRONMENT_TO_RUN_CONFIG,
        payload: {
          environment: selectedEnvironment.name
        }
      });
    }
  };

  const renderContent = () => {
    if (selectedEnvironment?.isPending) {
      return (
        <AddEnvironmentPanel
          environment={selectedEnvironment}
          onAddEnvironmentToRunConfig={handleAddEnvironmentToRunConfig}
        />
      );
    }

    if (
      !selectedEnvironment ||
      !environmentActivities[selectedEnvironment.name] ||
      !environmentActivities[selectedEnvironment.name].length
    ) {
      return (
        <>
          <s.Header>Recent Activity</s.Header>
          {renderNoData()}
        </>
      );
    }

    return (
      <RecentActivityTable
        viewMode={viewMode}
        data={environmentActivities[selectedEnvironment.name]}
        onSpanLinkClick={handleSpanLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        isTraceButtonVisible={config.isJaegerEnabled}
      />
    );
  };

  return (
    <s.Container>
      <Allotment defaultSizes={[70, 30]}>
        <s.RecentActivityContainer id={RECENT_ACTIVITY_CONTAINER_ID}>
          <EnvironmentPanel
            environments={environments}
            viewMode={viewMode}
            selectedEnvironment={selectedEnvironment}
            onEnvironmentSelect={handleEnvironmentSelect}
            onViewModeChange={handleViewModeChange}
            onEnvironmentAdd={handleEnvironmentAdd}
            onEnvironmentDelete={handleEnvironmentDelete}
          />
          {renderContent()}
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
