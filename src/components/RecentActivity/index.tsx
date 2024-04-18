import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { actions as globalActions } from "../../actions";
import { usePrevious } from "../../hooks/usePrevious";
import { isBoolean } from "../../typeGuards/isBoolean";
import { ChangeEnvironmentPayload } from "../../types";
import { groupBy } from "../../utils/groupBy";
import { ConfigContext } from "../common/App/ConfigContext";
import { ListIcon } from "../common/icons/ListIcon";
import { TableIcon } from "../common/icons/TableIcon";
import { CreateEnvironmentWizard } from "./CreateEnvironmentWizard";
import { DeleteEnvironmentConfirmation } from "./DeleteEnvironmentConfirmation";
import { Digmathon } from "./Digmathon";
import { EnvironmentInstructionsPanel } from "./EnvironmentInstructionsPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { NoData } from "./NoData";
import { ObservabilityStatusBadge } from "./ObservabilityStatusBadge";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import { Toggle } from "./Toggle";
import { WelcomeScreen } from "./WelcomeScreen";
import { actions } from "./actions";
import { Overlay } from "./common/Overlay";
import * as s from "./styles";
import {
  EntrySpan,
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

export const RecentActivity = (props: RecentActivityProps) => {
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<ExtendedEnvironment>();
  const [showCreationWizard, setShowCreationWizard] = useState(false);
  const [environmentToDelete, setEnvironmentToDelete] = useState<string>();
  const { recentActivityData: data } = useRecentActivityData({
    data: props.data
  });
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const { liveData, closeLiveSession } = useLiveData({
    liveData: props.liveData
  });
  const config = useContext(ConfigContext);
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
    areEnvironmentInstructionsVisible,
    setAreEnvironmentInstructionsVisible
  ] = useState(false);

  const environmentActivities = useMemo(
    () => (data ? groupBy(data.entries, (x) => x.environment) : {}),
    [data]
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
    setSelectedEnvironment((selectedEnvironment) => {
      const environmentToSelect = environments.find(
        (x) => x.id === selectedEnvironment?.id
      );

      if (environmentToSelect) {
        environmentToSelect.isNew = environmentToSelect?.hasRecentActivity
          ? false
          : selectedEnvironment?.isNew;
        return environmentToSelect;
      }

      return environments[0];
    });
  }, [environments]);

  useEffect(() => {
    setAreEnvironmentInstructionsVisible(false);
  }, [selectedEnvironment?.id]);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [config.userInfo?.id]);

  useEffect(() => {
    if (
      isBoolean(previousIsDigmathonCompleted) &&
      previousIsDigmathonCompleted !== isDigmathonCompleted &&
      isDigmathonCompleted
    ) {
      setIsDigmathonMode(true);
    }
  }, [previousIsDigmathonCompleted, isDigmathonCompleted]);

  const handleEnvironmentSelect = (environment: ExtendedEnvironment) => {
    setSelectedEnvironment(environment);

    const environmentToSelect = config.environments?.find(
      (x) => x.id === environment.id
    );

    if (environmentToSelect) {
      window.sendMessageToDigma<ChangeEnvironmentPayload>({
        action: globalActions.CHANGE_ENVIRONMENT,
        payload: {
          environment: environmentToSelect.id
        }
      });
    }
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

  const handleEnvironmentSetupInstructionsShow = () => {
    setAreEnvironmentInstructionsVisible(true);
  };

  const handleEnvironmentSetupInstructionsClose = () => {
    setAreEnvironmentInstructionsVisible(false);
  };

  const handleDigmathonModeButtonClick = () => {
    setIsDigmathonMode(true);
  };

  const handleDigmathonGoBack = () => {
    setIsDigmathonMode(false);
  };

  const renderContent = () => {
    if (
      selectedEnvironment &&
      (selectedEnvironment.isNew || areEnvironmentInstructionsVisible)
    ) {
      return (
        <EnvironmentInstructionsPanel
          environment={selectedEnvironment}
          onClose={
            areEnvironmentInstructionsVisible
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
        <s.NoDataContainer>
          <NoData />
        </s.NoDataContainer>
      );
    }

    const headerHeight = entry?.target.clientHeight || 0;

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
            newEnv.isNew = true;
            setSelectedEnvironment(newEnv);
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
                onDigmathonModeButtonClick={handleDigmathonModeButtonClick}
                onEnvironmentSetupInstructionsShow={
                  handleEnvironmentSetupInstructionsShow
                }
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
      {environmentToDelete && (
        <Overlay
          onClose={() => setEnvironmentToDelete(undefined)}
          tabIndex={-1}
        >
          <DeleteEnvironmentConfirmation
            onClose={handleCloseDeleteConfirmation}
            onDelete={handleConfirmEnvironmentDeletion}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
