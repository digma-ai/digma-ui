import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { getHostnameFromURL } from "../../utils/getHostNameFromURL";
import { groupBy } from "../../utils/groupBy";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { ConfigContextData } from "../common/App/types";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { AddEnvironmentPanel } from "./AddEnvironmentPanel";
import { AddSharedEnvironmentPanel } from "./AddSharedEnvironmentPanel";
import { DeleteEnvironmentConfirmation } from "./DeleteEnvironmentConfirmation";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { EnvironmentTypePanel } from "./EnvironmentTypePanel";
import { LiveView } from "./LiveView";
import { LiveData } from "./LiveView/types";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import { RegistrationPanel } from "./RegistrationPanel";
import { actions } from "./actions";
import * as s from "./styles";
import {
  EntrySpan,
  EnvironmentType,
  ExtendedEnvironment,
  RecentActivityData,
  RecentActivityProps
} from "./types";

export const RECENT_ACTIVITY_CONTAINER_ID = "recent-activity";

const isIDEConnectedToLocalDigma = (config: ConfigContextData): boolean => {
  const hostname = getHostnameFromURL(config.digmaApiUrl);

  if (hostname && ["localhost", "127.0.0.1"].includes(hostname)) {
    return true;
  }

  return false;
};

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
  const [environmentToDelete, setEnvironmentToDelete] = useState<string>();
  const [data, setData] = useState<RecentActivityData>();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [liveData, setLiveData] = useState<LiveData>();
  const [isRegistrationPopupVisible, setIsRegistrationPopupVisible] =
    useState(false);
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
            hasRecentActivity: environmentActivities[environment.originalName]
              ? environmentActivities[environment.originalName].some(isRecent)
              : false
          }))
        : [],
    [data, environmentActivities]
  );

  useEffect(() => {
    setSelectedEnvironment((selectedEnvironment) => {
      const environmentToSelect = environments.find(
        (x) => x.originalName === selectedEnvironment?.originalName
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

  const handleSpanLinkClick = (span: EntrySpan) => {
    if (selectedEnvironment) {
      window.sendMessageToDigma({
        action: actions.GO_TO_SPAN,
        payload: {
          span,
          environment: selectedEnvironment.originalName
        }
      });
    }
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
      originalName: environment,
      isPending: true,
      hasRecentActivity: false,
      additionToConfigResult: null,
      type: null,
      serverApiUrl: null,
      token: null
    });
  };

  const handleEnvironmentTypeSelect = (type: EnvironmentType) => {
    if (type === "shared" && !config.userEmail) {
      setIsRegistrationPopupVisible(true);
    }

    if (selectedEnvironment) {
      window.sendMessageToDigma({
        action: actions.SET_ENVIRONMENT_TYPE,
        payload: {
          environment: selectedEnvironment.originalName,
          type
        }
      });
    }
  };

  const handleEnvironmentDelete = (environment: string) => {
    setEnvironmentToDelete(environment);
  };

  const handleConfirmEnvironmentDeletion = () => {
    window.sendMessageToDigma({
      action: actions.DELETE_ENVIRONMENT,
      payload: {
        environment: environmentToDelete
      }
    });
    setEnvironmentToDelete(undefined);
  };

  const handleCloseDeleteConfirmation = () => {
    setEnvironmentToDelete(undefined);
  };

  const handleAddEnvironmentToRunConfig = () => {
    if (selectedEnvironment) {
      window.sendMessageToDigma({
        action: actions.ADD_ENVIRONMENT_TO_RUN_CONFIG,
        payload: {
          environment: selectedEnvironment.originalName
        }
      });
    }
  };

  const handleRegistrationSubmit = (email: string) => {
    window.sendMessageToDigma({
      action: actions.REGISTER,
      payload: {
        email
      }
    });
  };

  const handleRegistrationPopupClose = () => {
    setIsRegistrationPopupVisible(false);
  };

  const handleOverlayKeyDown = () => {
    if (setEnvironmentToDelete) {
      setEnvironmentToDelete(undefined);
    }

    if (setIsRegistrationPopupVisible) {
      setIsRegistrationPopupVisible(false);
    }
  };

  const renderContent = () => {
    if (selectedEnvironment?.isPending) {
      switch (selectedEnvironment.type) {
        case "local":
          return (
            <AddEnvironmentPanel
              environment={selectedEnvironment}
              onAddEnvironmentToRunConfig={handleAddEnvironmentToRunConfig}
            />
          );
        case "shared":
          return !isIDEConnectedToLocalDigma(config) ? (
            <AddEnvironmentPanel environment={selectedEnvironment} />
          ) : (
            <AddSharedEnvironmentPanel
              environment={selectedEnvironment}
              key={selectedEnvironment.originalName}
            />
          );
        case null:
          return (
            <EnvironmentTypePanel
              onEnvironmentTypeSelect={handleEnvironmentTypeSelect}
            />
          );
      }
    }

    if (
      !selectedEnvironment ||
      !environmentActivities[selectedEnvironment.originalName] ||
      !environmentActivities[selectedEnvironment.originalName].length
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
        data={environmentActivities[selectedEnvironment.originalName]}
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
      {environmentToDelete && (
        <s.Overlay onKeyDown={handleOverlayKeyDown}>
          <DeleteEnvironmentConfirmation
            onClose={handleCloseDeleteConfirmation}
            onDelete={handleConfirmEnvironmentDeletion}
          />
        </s.Overlay>
      )}
      {isRegistrationPopupVisible && (
        <s.Overlay onKeyDown={handleOverlayKeyDown}>
          <RegistrationPanel
            onSubmit={handleRegistrationSubmit}
            onClose={handleRegistrationPopupClose}
          />
        </s.Overlay>
      )}
    </s.Container>
  );
};
