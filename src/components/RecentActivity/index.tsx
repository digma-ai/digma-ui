import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { KeyboardEvent, useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { groupBy } from "../../utils/groupBy";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { CursorFollower } from "../common/CursorFollower";
import { DigmaLogoFlatIcon } from "../common/icons/DigmaLogoFlatIcon";
import { ListIcon } from "../common/icons/ListIcon";
import { TableIcon } from "../common/icons/TableIcon";
import { DeleteEnvironmentConfirmation } from "./DeleteEnvironmentConfirmation";
import { EnvironmentInstructionsPanel } from "./EnvironmentInstructionsPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { EnvironmentTypePanel } from "./EnvironmentTypePanel";
import { LiveView } from "./LiveView";
import { LiveData } from "./LiveView/types";
import { ObservabilityStatusBadge } from "./ObservabilityStatusBadge";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import { RegistrationPanel } from "./RegistrationPanel";
import { RegistrationFormValues } from "./RegistrationPanel/types";
import { SetupOrgDigmaPanel } from "./SetupOrgDigmaPanel";
import { Toggle } from "./Toggle";
import { actions } from "./actions";
import * as s from "./styles";
import {
  EntrySpan,
  EnvironmentType,
  ExtendedEnvironment,
  RecentActivityData,
  RecentActivityProps,
  ViewModeOption
} from "./types";

export const RECENT_ACTIVITY_CONTAINER_ID = "recent-activity";

const viewModeOptions: ViewModeOption[] = [
  {
    value: "table",
    icon: TableIcon
  },
  {
    value: "list",
    icon: ListIcon
  }
];

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
  const [environmentToSetType, setEnvironmentToSetType] = useState<{
    environment: string;
    type: EnvironmentType;
  }>();
  const [data, setData] = useState<RecentActivityData>();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [liveData, setLiveData] = useState<LiveData>();
  const [isRegistrationPopupVisible, setIsRegistrationPopupVisible] =
    useState(false);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const config = useContext(ConfigContext);
  const previousUserEmail = usePrevious(config.userEmail);
  const { observe, entry } = useDimensions();

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

  useEffect(() => {
    if (previousUserEmail !== config.userEmail && isRegistrationInProgress) {
      setIsRegistrationPopupVisible(false);
      setIsRegistrationInProgress(false);

      if (environmentToSetType) {
        setEnvironmentType(
          environmentToSetType.environment,
          environmentToSetType.type
        );

        setEnvironmentToSetType(undefined);
      }
    }
  }, [
    config.userEmail,
    isRegistrationInProgress,
    environmentToSetType,
    previousUserEmail
  ]);

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
      token: null,
      isOrgDigmaSetupFinished: false
    });
  };

  const setEnvironmentType = (environment: string, type: EnvironmentType) => {
    window.sendMessageToDigma({
      action: actions.SET_ENVIRONMENT_TYPE,
      payload: {
        environment: environment,
        type
      }
    });

    // if (type === "shared") {
    //   window.sendMessageToDigma({
    //     action: globalActions.OPEN_URL_IN_EDITOR_TAB,
    //     payload: {
    //       url: INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL,
    //       title: "Installing Digma in your organization"
    //     }
    //   });
    // }
  };

  const handleEnvironmentTypeSelect = (
    environment: string,
    type: EnvironmentType
  ) => {
    if (!config.userEmail) {
      setIsRegistrationPopupVisible(true);
      setEnvironmentToSetType({
        environment,
        type
      });
    } else {
      setEnvironmentType(environment, type);
    }
  };

  const handleCancelOrgDigmaSetup = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.SET_ENVIRONMENT_TYPE,
      payload: {
        environment,
        type: null
      }
    });
  };

  const handleFinishOrgDigmaSetup = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.FINISH_ORG_DIGMA_SETUP,
      payload: {
        environment
      }
    });
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

  const handleAddEnvironmentToRunConfig = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.ADD_ENVIRONMENT_TO_RUN_CONFIG,
      payload: {
        environment
      }
    });
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: actions.REGISTER,
      payload: {
        ...formData
      }
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationPopupClose = () => {
    setIsRegistrationPopupVisible(false);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setEnvironmentToDelete(undefined);
      setIsRegistrationPopupVisible(false);
    }
  };

  const renderContent = () => {
    if (selectedEnvironment?.isPending) {
      switch (selectedEnvironment.type) {
        case "local":
          return (
            <EnvironmentInstructionsPanel
              environment={selectedEnvironment}
              onAddEnvironmentToRunConfig={handleAddEnvironmentToRunConfig}
            />
          );
        case "shared":
          return selectedEnvironment.isOrgDigmaSetupFinished ? (
            <EnvironmentInstructionsPanel environment={selectedEnvironment} />
          ) : (
            <s.Overlay>
              <SetupOrgDigmaPanel
                environment={selectedEnvironment}
                key={selectedEnvironment.originalName}
                onFinish={handleFinishOrgDigmaSetup}
                onCancel={handleCancelOrgDigmaSetup}
              />
            </s.Overlay>
          );
        case null:
          return (
            <EnvironmentTypePanel
              environment={selectedEnvironment}
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
      return <>{renderNoData()}</>;
    }

    const headerHeight = entry?.target.clientHeight || 0;

    return (
      <RecentActivityTable
        viewMode={viewMode}
        data={environmentActivities[selectedEnvironment.originalName]}
        onSpanLinkClick={handleSpanLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        isTraceButtonVisible={config.isJaegerEnabled}
        headerHeight={headerHeight}
      />
    );
  };

  return (
    <s.Container>
      <Allotment defaultSizes={[70, 30]}>
        <s.RecentActivityContainer id={RECENT_ACTIVITY_CONTAINER_ID}>
          {/* <s.RecentActivityContainerBackground>
            <s.RecentActivityContainerBackgroundGradient />
          </s.RecentActivityContainerBackground> */}
          <s.RecentActivityHeader ref={observe}>
            <EnvironmentPanel
              environments={environments}
              selectedEnvironment={selectedEnvironment}
              onEnvironmentSelect={handleEnvironmentSelect}
              onEnvironmentAdd={handleEnvironmentAdd}
              onEnvironmentDelete={handleEnvironmentDelete}
            />
            <s.RecentActivityToolbarContainer>
              {!selectedEnvironment?.isPending && (
                <s.RecentActivityToolbar>
                  <span>Recent Activity</span>
                  <Toggle
                    value={viewMode}
                    options={viewModeOptions}
                    onChange={handleViewModeChange}
                  />
                </s.RecentActivityToolbar>
              )}
              {!config.isObservabilityEnabled && <ObservabilityStatusBadge />}
            </s.RecentActivityToolbarContainer>
          </s.RecentActivityHeader>
          <s.RecentActivityContentContainer>
            {renderContent()}
          </s.RecentActivityContentContainer>
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
            isRegistrationInProgress={isRegistrationInProgress}
          />
        </s.Overlay>
      )}
    </s.Container>
  );
};
