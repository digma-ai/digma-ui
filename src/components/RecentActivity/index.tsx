import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { useNow } from "../../hooks/useNow";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useDeleteEnvironmentMutation } from "../../redux/services/digma";
import { useToggleRecentIndicatorMutation } from "../../redux/services/plugin";
import type {
  Environment,
  SlimEntrySpanData
} from "../../redux/services/types";
import { isBoolean } from "../../typeGuards/isBoolean";
import { ScopeChangeEvent } from "../../types";
import { changeScope } from "../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import type { Scope } from "../common/App/types";
import { Overlay } from "../common/Overlay";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { CreateEnvironmentFinishScreenContent } from "./CreateEnvironmentFinishScreenContent";
import { CreateEnvironmentWizard } from "./CreateEnvironmentWizard";
import { Digmathon } from "./Digmathon";
import { EnvironmentInstructionsPanel } from "./EnvironmentInstructionsPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { getEnvironmentTabId } from "./EnvironmentPanel/EnvironmentTab/getEnvironmentTabIdPrefix";
import type { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { NoData } from "./NoData";
import {
  IS_RECENT_TIME_LIMIT,
  RecentActivityTable
} from "./RecentActivityTable";
import { RecentActivityHeader } from "./RecentActivityToolbar";
import { WelcomeScreen } from "./WelcomeScreen";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type {
  EnvironmentClearDataTimeStamps,
  EnvironmentInstructionsVisibility,
  ExtendedEnvironment
} from "./types";
import { useDigmathonProgressData } from "./useDigmathonProgressData";
import { useLiveData } from "./useLiveData";
import { useRecentActivityData } from "./useRecentActivityData";

export const RECENT_ACTIVITY_CONTAINER_ID = "recent-activity";

const changeSelectedEnvironment = (
  scope: Scope | undefined,
  environments: Environment[] | undefined,
  environmentId: string
) => {
  const environmentToSelect = environments?.find((x) => x.id === environmentId);

  if (environmentToSelect) {
    changeScope({
      span: scope?.span
        ? {
            spanCodeObjectId: scope.span.spanCodeObjectId
          }
        : null,
      environmentId: environmentToSelect.id
    });
  }
};

const ENVIRONMENT_CLEAR_DATA_TIMESTAMP_PERSISTENCE_KEY =
  "environmentClearDataTimestamps";

export const RecentActivity = () => {
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
  const recentActivityData = useRecentActivityData(selectedEnvironment?.id);
  const [deleteEnvironment] = useDeleteEnvironmentMutation();
  const [toggleRecentIndicator] = useToggleRecentIndicatorMutation();
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
  const [createdEnvironment, setCreatedEnvironment] = useState<Environment>();

  const config = useContext(ConfigContext);
  const previousUserRegistrationEmail = usePrevious(
    config.userRegistrationEmail
  );
  const now = useNow();

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const { liveData, closeLiveView } = useLiveData();

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

  const filteredEntries = useMemo(
    () =>
      recentActivityData.entries?.filter((entry) => {
        const clearDataTimestamp =
          persistedEnvironmentClearDataTimestamps?.[entry.environment];

        return clearDataTimestamp
          ? new Date(entry.latestTraceTimestamp).valueOf() >
              new Date(clearDataTimestamp).valueOf()
          : true;
      }) ?? [],
    [recentActivityData.entries, persistedEnvironmentClearDataTimestamps]
  );

  const extendedEnvironments: ExtendedEnvironment[] = useMemo(
    () =>
      recentActivityData.environments?.map((environment) => ({
        ...environment,
        additionToConfigResult: null,
        serverApiUrl: null,
        isOrgDigmaSetupFinished: false,
        hasRecentActivity: Boolean(
          environment.lastActive &&
            now - new Date(environment.lastActive).valueOf() <=
              IS_RECENT_TIME_LIMIT
        )
      })) ?? [],
    [recentActivityData.environments, now]
  );

  useEffect(() => {
    const isAnyRecentActivity = extendedEnvironments.some(
      (environment) => environment.hasRecentActivity
    );

    void toggleRecentIndicator({
      status: isAnyRecentActivity
    });
  }, [extendedEnvironments, toggleRecentIndicator]);

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
      filteredEntries &&
      environmentInstructionsVisibility.isOpen &&
      !environmentInstructionsVisibility.keepOpen
    ) {
      setEnvironmentInstructionsVisibility({
        isOpen: false,
        keepOpen: false
      });
    }
  }, [filteredEntries, environmentInstructionsVisibility, selectedEnvironment]);

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
    const currentEnvironmentId = config.environment?.id;
    const environmentToSelect = extendedEnvironments.find(
      (x) => x.id === currentEnvironmentId
    );

    if (environmentToSelect) {
      setSelectedEnvironment(environmentToSelect);
    } else {
      setSelectedEnvironment(undefined);

      if (currentEnvironmentId) {
        if (currentEnvironmentId === environmentToDelete) {
          setEnvironmentToDelete(undefined);
        }

        if (currentEnvironmentId === environmentToClearData) {
          setEnvironmentToClearData(undefined);
        }

        if (
          currentEnvironmentId ===
          environmentInstructionsVisibility.newlyCreatedEnvironmentId
        ) {
          setEnvironmentInstructionsVisibility({
            isOpen: false,
            keepOpen: false,
            newlyCreatedEnvironmentId: undefined
          });
        }
      }

      if (extendedEnvironments.length > 0) {
        changeScope({
          span: config.scope?.span
            ? {
                spanCodeObjectId: config.scope.span.spanCodeObjectId
              }
            : null,
          environmentId: extendedEnvironments[0].id
        });
      }
    }
  }, [
    config.environment?.id,
    extendedEnvironments,
    config.scope?.span,
    environmentInstructionsVisibility.newlyCreatedEnvironmentId,
    environmentToClearData,
    environmentToDelete
  ]);

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
    changeSelectedEnvironment(
      config.scope,
      extendedEnvironments,
      environment.id
    );
  };

  const handleSpanLinkClick = (span: SlimEntrySpanData) => {
    if (selectedEnvironment) {
      changeScope({
        span: {
          spanCodeObjectId: span.spanCodeObjectId
        },
        context: {
          event: ScopeChangeEvent.RecentActivitySpanLinkClicked
        }
      });
    }
  };

  const handleTraceButtonClick = (traceId: string, span: SlimEntrySpanData) => {
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
    if (!environmentToDelete) {
      return;
    }

    void deleteEnvironment({
      id: environmentToDelete
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
      recentActivityData.areEntriesLoading &&
      recentActivityData.entries === undefined
    ) {
      return (
        <>
          <s.NoDataRecentActivityContainerBackground>
            <s.NoDataRecentActivityContainerBackgroundGradient />
          </s.NoDataRecentActivityContainerBackground>
          <s.LoadingContainer>
            <s.Spinner size={32} />
          </s.LoadingContainer>
        </>
      );
    }

    if (!selectedEnvironment || filteredEntries.length === 0) {
      return (
        <>
          <s.NoDataRecentActivityContainerBackground>
            <s.NoDataRecentActivityContainerBackgroundGradient />
          </s.NoDataRecentActivityContainerBackground>
          {selectedEnvironment && (
            <s.NoDataRecentActivityHeader
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              environment={selectedEnvironment}
            />
          )}
          <s.NoDataContainer>
            <NoData />
          </s.NoDataContainer>
        </>
      );
    }

    const headerHeight = entry?.target.clientHeight ?? 0;

    return (
      <>
        <RecentActivityHeader
          showToolbar={true}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          environment={selectedEnvironment}
        />
        <RecentActivityTable
          viewMode={viewMode}
          data={filteredEntries}
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

  const handleEnvironmentCreate = (environment: Environment) => {
    setCreatedEnvironment(environment);
  };

  const handleCreateEnvironmentWizardClose = (id: string | null) => {
    if (id) {
      const newEnv = extendedEnvironments.find((x) => x.id === id);
      if (newEnv) {
        changeSelectedEnvironment(
          config.scope,
          extendedEnvironments,
          newEnv.id
        );
        setEnvironmentInstructionsVisibility({
          isOpen: true,
          newlyCreatedEnvironmentId: newEnv.id,
          keepOpen: false
        });
      }
    }
    setShowCreationWizard(false);
    setCreatedEnvironment(undefined);
  };

  return showCreationWizard ? (
    <CreateEnvironmentWizard
      onCreate={handleEnvironmentCreate}
      finishScreenContent={
        <CreateEnvironmentFinishScreenContent
          onOpenEnvironment={handleCreateEnvironmentWizardClose}
          environment={createdEnvironment}
        />
      }
      isCentralizedDeployment={Boolean(config.backendInfo?.centralize)}
      onClose={handleCreateEnvironmentWizardClose}
      isCancelConfirmationEnabled={true}
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
            <s.EnvironmentPanelContainer ref={observe}>
              <EnvironmentPanel
                environments={extendedEnvironments}
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
            </s.EnvironmentPanelContainer>
            <s.RecentActivityContentContainer>
              {renderContent()}
            </s.RecentActivityContentContainer>
          </s.RecentActivityContainer>
          <Allotment.Pane visible={Boolean(liveData)} minSize={450}>
            {liveData && (
              <s.LiveViewContainer>
                <LiveView data={liveData} onClose={closeLiveView} />
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
              content={"Are you sure that you want to delete this environment?"}
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
              content={
                <s.ClearDataMessageContainer>
                  <span>Are you sure you want to clear the data from this</span>
                  <span>environment? This action cannot be undone.</span>
                </s.ClearDataMessageContainer>
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
