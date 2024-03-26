import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { KeyboardEvent, useContext, useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { groupBy } from "../../utils/groupBy";
import { ConfigContext } from "../common/App/ConfigContext";
import { ListIcon } from "../common/icons/ListIcon";
import { TableIcon } from "../common/icons/TableIcon";
import { CreateEnvironmentWizard } from "./CreateEnvironmentWizard";
import { DeleteEnvironmentConfirmation } from "./DeleteEnvironmentConfirmation";
import { EnvironmentInstructionsPanel } from "./EnvironmentInstructionsPanel";
import { EnvironmentPanel } from "./EnvironmentPanel";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveView } from "./LiveView";
import { NoData } from "./NoData";
import { ObservabilityStatusBadge } from "./ObservabilityStatusBadge";
import { RecentActivityTable, isRecent } from "./RecentActivityTable";
import { Toggle } from "./Toggle";
import { actions } from "./actions";
import * as s from "./styles";
import {
  EntrySpan,
  ExtendedEnvironment,
  RecentActivityProps,
  ViewModeOption
} from "./types";
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

  // useEffect(() => {
  //   window.sendMessageToDigma({
  //     action: actions.INITIALIZE
  //   });

  //   const handleOpenRegistrationDialog = () => {
  //     setIsRegistrationPopupVisible(true);
  //   };

  //   dispatcher.addActionListener(
  //     actions.OPEN_REGISTRATION_DIALOG,
  //     handleOpenRegistrationDialog
  //   );

  //   return () => {
  //     dispatcher.removeActionListener(
  //       actions.OPEN_REGISTRATION_DIALOG,
  //       handleOpenRegistrationDialog
  //     );
  //   };
  // }, []);

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

  const handleAddEnvironmentToRunConfig = (environment: string) => {
    window.sendMessageToDigma({
      action: actions.ADD_ENVIRONMENT_TO_RUN_CONFIG,
      payload: {
        environment
      }
    });
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setEnvironmentToDelete(undefined);
    }
  };

  const renderContent = () => {
    if (!selectedEnvironment) {
      return <NoData />;
    }

    if (
      environmentActivities[selectedEnvironment.originalName] &&
      !environmentActivities[selectedEnvironment.originalName].length
    ) {
      <EnvironmentInstructionsPanel
        environment={selectedEnvironment}
        onAddEnvironmentToRunConfig={handleAddEnvironmentToRunConfig}
      />;
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

  return showCreationWizard ? (
    <CreateEnvironmentWizard
      onClose={(newEnvName) => {
        if (newEnvName) {
          const newEnv = environments.find((x) => x.name == newEnvName);
          newEnv && setSelectedEnvironment(newEnv);
        }
        setShowCreationWizard(false);
      }}
    />
  ) : (
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
              <LiveView data={liveData} onClose={closeLiveSession} />
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
    </s.Container>
  );
};
