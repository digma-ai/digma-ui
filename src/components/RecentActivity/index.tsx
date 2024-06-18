import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { isBoolean } from "../../typeGuards/isBoolean";
import { ChangeEnvironmentPayload } from "../../types";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { groupBy } from "../../utils/groupBy";
import { ConfigContext } from "../common/App/ConfigContext";
import { Environment } from "../common/App/types";
import { Overlay } from "../common/Overlay";
import { RegistrationDialog } from "../common/RegistrationDialog";
import { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { ListIcon } from "../common/icons/ListIcon";
import { TableIcon } from "../common/icons/TableIcon";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { CreateEnvironmentWizard } from "./CreateEnvironmentWizard";
import { Digmathon } from "./Digmathon";
import { EnvironmentInstructionsPanel } from "./EnvironmentInstructionsPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { getEnvironmentTabId } from "./EnvironmentPanel/EnvironmentTab/getEnvironmentTabIdPrefix";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { NoData } from "./NoData";
import { ObservabilityStatusBadge } from "./ObservabilityStatusBadge";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import { Toggle } from "./Toggle";
import { WelcomeScreen } from "./WelcomeScreen";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import {
  EntrySpan,
  EnvironmentClearDataTimeStamps,
  EnvironmentInstructionsVisibility,
  ExtendedEnvironment,
  RecentActivityProps,
  ViewModeOption
} from "./types";
import { useDigmathonProgressData } from "./useDigmathonProgressData";
import { useLiveData } from "./useLiveData";
import { useRecentActivityData } from "./useRecentActivityData";

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

const changeSelectedEnvironment = (
  environments: Environment[] | undefined,
  environmentId: string
) => {
  const environmentToSelect = environments?.find((x) => x.id === environmentId);

  if (environmentToSelect) {
    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: globalActions.CHANGE_ENVIRONMENT,
      payload: {
        environment: environmentToSelect.id
      }
    });
  }
};

const ENVIRONMENT_CLEAR_DATA_TIMESTAMP_PERSISTENCE_KEY =
  "environmentClearDataTimestamps";

export const RecentActivity = (props: RecentActivityProps) => {
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<ExtendedEnvironment>();
  const [showCreationWizard, setShowCreationWizard] = useState(false);
  const [isRegistrationPopupVisible, setIsRegistrationPopupVisible] =
    useState(false);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const [environmentToDelete, setEnvironmentToDelete] = useState<string>();
  const [environmentToClearData, setEnvironmentToClearData] =
    useState<string>();
  const { recentActivityData: data } = useRecentActivityData({
    data: props.data
  });
  const isEnvironmentConfirmationDialogVisible = Boolean(
    environmentToDelete ?? environmentToClearData
  );
  const [
    persistedEnvironmentClearDataTimestamps,
    setPersistedEnvironmentClearDataTimestamps
  ] = usePersistence<EnvironmentClearDataTimeStamps>(
    ENVIRONMENT_CLEAR_DATA_TIMESTAMP_PERSISTENCE_KEY,
    "application"
  );

  const config = useContext(ConfigContext);
  const previousUserRegistrationEmail = usePrevious(
    config.userRegistrationEmail
  );

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const { liveData, closeLiveSession } = useLiveData({
    liveData: props.liveData
  });

  const [isDigmathonMode, setIsDigmathonMode] = useState(false);
  const { observe, entry } = useDimensions();
  const {
    data: digmathonProgressData,
    getData: getDigmathonProgressData,
    foundIssuesCount,
    isDigmathonCompleted
  } = useDigmathonProgressData();
  const previousIsDigmathonCompleted = usePrevious(isDigmathonCompleted);
  const [
    environmentInstructionsVisibility,
    setEnvironmentInstructionsVisibility
  ] = useState<EnvironmentInstructionsVisibility>({
    isOpen: false,
    keepOpen: false
  });

  const filteredEntries = useMemo(() => {
    return data?.entries.filter((entry) => {
      const clearDataTimestamp =
        persistedEnvironmentClearDataTimestamps?.[entry.environment];

      return clearDataTimestamp
        ? new Date(entry.latestTraceTimestamp).valueOf() >
            new Date(clearDataTimestamp).valueOf()
        : true;
    });
  }, [data, persistedEnvironmentClearDataTimestamps]);

  const environmentActivities = useMemo(
    () =>
      filteredEntries ? groupBy(filteredEntries, (x) => x.environment) : {},
    [filteredEntries]
  );

  const environments: ExtendedEnvironment[] = useMemo(
    () =>
      data
        ? data.environments.map((environment) => ({
            ...environment,
            hasRecentActivity: environmentActivities[environment.id]
              ? environmentActivities[environment.id].some(isRecent)
              : false
          }))
        : [],
    [data, environmentActivities]
  );

  useEffect(() => {
    if (selectedEnvironment?.id) {
      setEnvironmentInstructionsVisibility((state) => ({
        isOpen: selectedEnvironment.id === state.newlyCreatedEnvironmentId,
        keepOpen: false
      }));

      const environmentTabId = getEnvironmentTabId(selectedEnvironment.id);
      const environmentTabElement = document.getElementById(environmentTabId);
      if (environmentTabElement) {
        environmentTabElement.scrollIntoView(false);
      }
    }
  }, [selectedEnvironment?.id]);

  useEffect(() => {
    if (
      selectedEnvironment &&
      environmentActivities[selectedEnvironment?.id] &&
      environmentInstructionsVisibility.isOpen &&
      !environmentInstructionsVisibility.keepOpen
    ) {
      setEnvironmentInstructionsVisibility({
        isOpen: false,
        keepOpen: false
      });
    }
  }, [
    environmentActivities,
    environmentInstructionsVisibility,
    selectedEnvironment
  ]);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [config.userInfo?.id]);

  useEffect(() => {
    const handleOpenRegistrationDialog = () => {
      setIsRegistrationPopupVisible(true);
    };

    dispatcher.addActionListener(
      actions.OPEN_REGISTRATION_DIALOG,
      handleOpenRegistrationDialog
    );

    return () => {
      dispatcher.removeActionListener(
        actions.OPEN_REGISTRATION_DIALOG,
        handleOpenRegistrationDialog
      );
    };
  }, []);

  useEffect(() => {
    if (
      isBoolean(previousIsDigmathonCompleted) &&
      previousIsDigmathonCompleted !== isDigmathonCompleted &&
      isDigmathonCompleted
    ) {
      setIsDigmathonMode(true);
    }
  }, [previousIsDigmathonCompleted, isDigmathonCompleted]);

  useEffect(() => {
    const environmentToSelect = environments.find(
      (x) => x.id === config.environment?.id
    );

    if (environmentToSelect) {
      setSelectedEnvironment(environmentToSelect);
    } else {
      setSelectedEnvironment(environments[0]);
    }
  }, [config.environment?.id, environments]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== config.userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationPopupVisible(false);
      setIsRegistrationInProgress(false);
    }
  }, [
    config.userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  const handleEnvironmentSelect = (environment: ExtendedEnvironment) => {
    changeSelectedEnvironment(config.environments, environment.id);
  };

  const handleSpanLinkClick = (span: EntrySpan) => {
    if (selectedEnvironment) {
      window.sendMessageToDigma({
        action: actions.GO_TO_SPAN,
        payload: {
          span,
          environment: selectedEnvironment.id
        }
      });
    }
  };

  const handleTraceButtonClick = (traceId: string, span: EntrySpan) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        traceId,
        span: {
          scopeId: span.scopeId,
          displayText: span.displayText
        }
      }
    });
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleEnvironmentAdd = () => {
    setShowCreationWizard(true);
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

  const handleEnvironmentClearData = (environment: string) => {
    setEnvironmentToClearData(environment);
  };

  const handleConfirmEnvironmentDataClearance = () => {
    if (environmentToClearData) {
      const currentTimeStamps = persistedEnvironmentClearDataTimestamps ?? {};
      setPersistedEnvironmentClearDataTimestamps({
        ...currentTimeStamps,
        [environmentToClearData]: new Date().toISOString()
      });

      setEnvironmentToClearData(undefined);
    }
  };

  const handleCloseClearDataConfirmation = () => {
    setEnvironmentToClearData(undefined);
  };

  const handleOverlayClick = () => {
    sendUserActionTrackingEvent(trackingEvents.OVERLAY_CLOSED);
    handleCloseDeleteConfirmation();
    handleCloseClearDataConfirmation();
  };

  const handleEnvironmentSetupInstructionsShow = () => {
    setEnvironmentInstructionsVisibility({
      isOpen: true,
      keepOpen: true
    });
  };

  const handleEnvironmentSetupInstructionsClose = () => {
    setEnvironmentInstructionsVisibility({
      isOpen: false,
      keepOpen: false
    });
  };

  const handleDigmathonModeButtonClick = () => {
    setIsDigmathonMode(true);
  };

  const handleDigmathonGoBack = () => {
    setIsDigmathonMode(false);
  };

  const handleRegistrationDialogClose = () => {
    setIsRegistrationPopupVisible(false);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: globalActions.PERSONALIZE_REGISTER,
      payload: {
        ...formData,
        ...(selectedEnvironment
          ? {
              scope: "recent activity add environment",
              selectedEnvironmentType: selectedEnvironment?.type
            }
          : {
              scope: "recent activity"
            })
      }
    });

    setIsRegistrationInProgress(true);
  };

  const renderContent = () => {
    if (selectedEnvironment && environmentInstructionsVisibility.isOpen) {
      return (
        <EnvironmentInstructionsPanel
          environment={selectedEnvironment}
          onClose={
            environmentInstructionsVisibility.keepOpen
              ? handleEnvironmentSetupInstructionsClose
              : undefined
          }
        />
      );
    }

    if (
      !selectedEnvironment ||
      !environmentActivities[selectedEnvironment.id]
    ) {
      return (
        <>
          <s.NoDataRecentActivityContainerBackground>
            <s.NoDataRecentActivityContainerBackgroundGradient />
          </s.NoDataRecentActivityContainerBackground>
          <s.NoDataContainer>
            <NoData />
          </s.NoDataContainer>
        </>
      );
    }

    const headerHeight = entry?.target.clientHeight ?? 0;

    return (
      <>
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
        <RecentActivityTable
          viewMode={viewMode}
          data={environmentActivities[selectedEnvironment.id]}
          onSpanLinkClick={handleSpanLinkClick}
          onTraceButtonClick={handleTraceButtonClick}
          isTraceButtonVisible={config.isJaegerEnabled}
          headerHeight={headerHeight}
        />
      </>
    );
  };

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <WelcomeScreen />;
  }

  return showCreationWizard ? (
    <CreateEnvironmentWizard
      onClose={(newEnvId) => {
        if (newEnvId) {
          const newEnv = environments.find((x) => x.id == newEnvId);
          if (newEnv) {
            changeSelectedEnvironment(config.environments, newEnv.id);
            setEnvironmentInstructionsVisibility({
              isOpen: true,
              newlyCreatedEnvironmentId: newEnv.id,
              keepOpen: false
            });
          }
        }
        setShowCreationWizard(false);
      }}
    />
  ) : (
    <s.Container>
      {isDigmathonMode ? (
        <Digmathon
          data={digmathonProgressData}
          getData={getDigmathonProgressData}
          foundIssuesCount={foundIssuesCount}
          isDigmathonCompleted={isDigmathonCompleted}
          onGoBack={handleDigmathonGoBack}
        />
      ) : (
        <Allotment defaultSizes={[70, 30]}>
          <s.RecentActivityContainer id={RECENT_ACTIVITY_CONTAINER_ID}>
            <s.RecentActivityHeader ref={observe}>
              <EnvironmentPanel
                environments={environments}
                selectedEnvironment={selectedEnvironment}
                onEnvironmentSelect={handleEnvironmentSelect}
                onEnvironmentAdd={handleEnvironmentAdd}
                onEnvironmentDelete={handleEnvironmentDelete}
                onDigmathonModeButtonClick={handleDigmathonModeButtonClick}
                onEnvironmentSetupInstructionsShow={
                  handleEnvironmentSetupInstructionsShow
                }
                onEnvironmentClearData={handleEnvironmentClearData}
              />
            </s.RecentActivityHeader>
            <s.RecentActivityContentContainer>
              {renderContent()}
            </s.RecentActivityContentContainer>
          </s.RecentActivityContainer>
          <Allotment.Pane visible={Boolean(liveData)} minSize={450}>
            {liveData && (
              <s.LiveViewContainer>
                <LiveView data={liveData} onClose={closeLiveSession} />
              </s.LiveViewContainer>
            )}
          </Allotment.Pane>
        </Allotment>
      )}
      {isEnvironmentConfirmationDialogVisible && (
        <Overlay onClose={handleOverlayClick} tabIndex={-1}>
          {environmentToDelete && (
            <ConfirmationDialog
              title={"Delete environment"}
              message={"Are you sure that you want to delete this environment?"}
              confirmButtonText={"Delete"}
              onConfirm={handleConfirmEnvironmentDeletion}
              onCancel={handleCloseDeleteConfirmation}
              trackingData={{
                dialog: "Delete environment"
              }}
            />
          )}
          {environmentToClearData && (
            <ConfirmationDialog
              title={"Clear data?"}
              message={
                "Are you sure you want to clear the data from this environment? This action cannot be undone."
              }
              confirmButtonText={"Clear Data"}
              onConfirm={handleConfirmEnvironmentDataClearance}
              onCancel={handleCloseClearDataConfirmation}
              trackingData={{
                dialog: "Clear data"
              }}
            />
          )}
        </Overlay>
      )}
      {isRegistrationPopupVisible && (
        <Overlay tabIndex={-1}>
          <RegistrationDialog
            onSubmit={handleRegistrationSubmit}
            onClose={handleRegistrationDialogClose}
            isRegistrationInProgress={isRegistrationInProgress}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
