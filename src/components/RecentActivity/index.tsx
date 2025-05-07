import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { useNow } from "../../hooks/useNow";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import {
  useDeleteEnvironmentMutation,
  useGetEnvironmentsQuery
} from "../../redux/services/digma";
import { useToggleRecentIndicatorMutation } from "../../redux/services/plugin";
import type { Environment } from "../../redux/services/types";
import { isBoolean } from "../../typeGuards/isBoolean";
import { changeScope } from "../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { ConfigContext } from "../common/App/ConfigContext";
import type { Scope } from "../common/App/types";
import { Overlay } from "../common/Overlay";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { CreateEnvironmentFinishScreenContent } from "./CreateEnvironmentFinishScreenContent";
import { CreateEnvironmentWizard } from "./CreateEnvironmentWizard";
import { Digmathon } from "./Digmathon";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { getEnvironmentTabId } from "./EnvironmentPanel/EnvironmentTab/getEnvironmentTabIdPrefix";
import { LiveView } from "./LiveView";
import { RecentActivityContent } from "./RecentActivityContent";
import { IS_RECENT_TIME_LIMIT } from "./RecentActivityTable";
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

export const RECENT_ACTIVITY_CONTAINER_ID = "recent-activity";
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

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
  const [deleteEnvironment] = useDeleteEnvironmentMutation();
  const [toggleRecentIndicator] = useToggleRecentIndicatorMutation();
  const [environments, setEnvironments] = useState<Environment[]>();
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

  const { userInfo, backendInfo, userRegistrationEmail, environment, scope } =
    useContext(ConfigContext);
  const isInitialized = userInfo?.id && backendInfo;
  const previousUserId = usePrevious(userInfo?.id);
  const previousBackendInfo = usePrevious(backendInfo);
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  const now = useNow();

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

  const clearDataTimestamp = selectedEnvironment
    ? persistedEnvironmentClearDataTimestamps?.[selectedEnvironment.id]
    : undefined;

  const getEnvironmentsQueryCacheKey = `${JSON.stringify(backendInfo)}-${
    userInfo?.id
  }`;

  const {
    data,
    refetch,
    isUninitialized: isQueryUninitialized
  } = useGetEnvironmentsQuery(getEnvironmentsQueryCacheKey, {
    pollingInterval: REFRESH_INTERVAL,
    skip: !isInitialized,
    refetchOnReconnect: true
  });

  const extendedEnvironments: ExtendedEnvironment[] = useMemo(
    () =>
      environments?.map((environment) => ({
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
    [environments, now]
  );

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line no-console
      console.log("Environments data received", data);
      setEnvironments(data);
    }
  }, [data]);

  // Clear the environments on backend or user change
  useEffect(() => {
    if (
      (previousUserId && previousUserId !== userInfo?.id) ||
      (previousBackendInfo &&
        !areBackendInfosEqual(previousBackendInfo, backendInfo ?? null))
    ) {
      // eslint-disable-next-line no-console
      console.log(
        "User or backend info changed, clearing environments and refetching",
        previousUserId,
        userInfo?.id,
        previousBackendInfo,
        backendInfo
      );
      setEnvironments([]);

      if (isInitialized && !isQueryUninitialized) {
        // eslint-disable-next-line no-console
        console.log("Refetching environments");
        void refetch();
      }
    }
  }, [
    userInfo?.id,
    previousUserId,
    backendInfo,
    previousBackendInfo,
    refetch,
    isInitialized,
    isQueryUninitialized
  ]);

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
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [userInfo?.id]);

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
    const currentEnvironmentId = environment?.id;
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
          span: scope?.span
            ? {
                spanCodeObjectId: scope.span.spanCodeObjectId
              }
            : null,
          environmentId: extendedEnvironments[0].id
        });
      }
    }
  }, [
    environment?.id,
    extendedEnvironments,
    scope?.span,
    environmentInstructionsVisibility.newlyCreatedEnvironmentId,
    environmentToClearData,
    environmentToDelete
  ]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationPopupVisible(false);
      setIsRegistrationInProgress(false);
    }
  }, [
    userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  const handleEnvironmentSelect = (environment: ExtendedEnvironment) => {
    changeSelectedEnvironment(scope, extendedEnvironments, environment.id);
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

  if (!userInfo?.id && backendInfo?.centralize) {
    return <WelcomeScreen />;
  }

  const handleEnvironmentCreate = (environment: Environment) => {
    setCreatedEnvironment(environment);
  };

  const handleCreateEnvironmentWizardClose = (id: string | null) => {
    if (id) {
      const newEnv = extendedEnvironments.find((x) => x.id === id);
      if (newEnv) {
        changeSelectedEnvironment(scope, extendedEnvironments, newEnv.id);
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

  const headerHeight = entry?.target.clientHeight ?? 0;

  return showCreationWizard ? (
    <CreateEnvironmentWizard
      onCreate={handleEnvironmentCreate}
      finishScreenContent={
        <CreateEnvironmentFinishScreenContent
          onOpenEnvironment={handleCreateEnvironmentWizardClose}
          environment={createdEnvironment}
        />
      }
      isCentralizedDeployment={Boolean(backendInfo?.centralize)}
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
              <RecentActivityContent
                environment={selectedEnvironment}
                environmentInstructionsVisibility={
                  environmentInstructionsVisibility
                }
                headerHeight={headerHeight}
                clearDataTimestamp={clearDataTimestamp}
                onEnvironmentSetupInstructionsClose={
                  handleEnvironmentSetupInstructionsClose
                }
              />
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
