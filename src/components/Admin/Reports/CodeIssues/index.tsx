import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import { useMount } from "../../../../hooks/useMount";
import type { IssueCriticality } from "../../../../redux/services/types";
import {
  clear,
  setCriticalityLevels,
  setPeriodInDays,
  setSelectedEndpoints,
  setSelectedEnvironmentId,
  setSelectedService,
  setSelectedServices,
  setTimeMode,
  setViewLevel,
  setViewMode,
  type IssuesReportTimeMode,
  type IssuesReportViewLevel,
  type IssuesReportViewMode
} from "../../../../redux/slices/issuesReportSlice";
import { IssuesReport } from "../../../common/IssuesReport";
import type { TargetScope } from "../../../common/IssuesReport/types";
import { IssuesSidebar } from "./IssuesSidebar";
import * as s from "./styles";

export const CodeIssues = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scope, setScope] = useState<{ value: string; displayName?: string }>();
  const [activeTileIds, setActiveTileIds] = useState<string[] | undefined>(
    undefined
  );

  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const criticalityLevels = useAdminSelector(
    (state) => state.codeIssuesReport.criticalityLevels
  );
  const periodInDays = useAdminSelector(
    (state) => state.codeIssuesReport.periodInDays
  );
  const selectedService = useAdminSelector(
    (state) => state.codeIssuesReport.selectedService
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const viewLevel = useAdminSelector(
    (state) => state.codeIssuesReport.viewLevel
  );
  const viewMode = useAdminSelector((state) => state.codeIssuesReport.viewMode);
  const timeMode = useAdminSelector((state) => state.codeIssuesReport.timeMode);
  const selectedEndpoints = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEndpoints
  );

  const dispatch = useAdminDispatch();

  useMount(() => {
    return () => {
      dispatch(clear());
    };
  });

  const handleTileTitleClick = (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    if (viewMode === "table" && viewLevel === "endpoints") {
      setScope(target);
      setIsSidebarOpen(true);
      setActiveTileIds([target.value]);
    }
  };

  const handleTileIssuesStatsClick = (
    _: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    setScope(target);
    setIsSidebarOpen(true);
    setActiveTileIds([target.value]);
  };

  const handleSelectedEnvironmentIdChange = (environmentId: string) => {
    dispatch(setSelectedEnvironmentId(environmentId));
  };

  const handleSelectedServicesChange = (services: string[]) => {
    dispatch(setSelectedServices(services));
  };

  const handleSelectedEndpointsChange = (endpoints: string[]) => {
    dispatch(setSelectedEndpoints(endpoints));
  };

  const handleCriticalityLevelsChange = (criticalities: IssueCriticality[]) => {
    dispatch(setCriticalityLevels(criticalities));
  };

  const handlePeriodInDaysChange = (periodInDays: number) => {
    dispatch(setPeriodInDays(periodInDays));
  };

  const handleTimeModeChange = (timeMode: IssuesReportTimeMode) => {
    dispatch(setTimeMode(timeMode));
  };

  const handleViewModeChange = (viewMode: IssuesReportViewMode) => {
    dispatch(setViewMode(viewMode));
  };

  const handleViewLevelChange = (viewLevel: IssuesReportViewLevel) => {
    dispatch(setViewLevel(viewLevel));
  };

  const handleSelectedServiceChange = (service: string | null) => {
    dispatch(setSelectedService(service));
  };

  const handleIssuesSidebarClose = () => {
    setIsSidebarOpen(false);
    setActiveTileIds(undefined);
  };

  return (
    <s.Container>
      <IssuesReport
        selectedEnvironmentId={selectedEnvironmentId}
        criticalityLevels={criticalityLevels}
        periodInDays={periodInDays}
        selectedService={selectedService}
        selectedServices={selectedServices}
        selectedEndpoints={selectedEndpoints}
        viewLevel={viewLevel}
        viewMode={viewMode}
        timeMode={timeMode}
        defaultHeaderTitle={"Code Issues"}
        onTileTitleClick={handleTileTitleClick}
        onTileIssuesStatsClick={handleTileIssuesStatsClick}
        onSelectedEnvironmentIdChange={handleSelectedEnvironmentIdChange}
        onSelectedServicesChange={handleSelectedServicesChange}
        onSelectedEndpointsChange={handleSelectedEndpointsChange}
        onCriticalityLevelsChange={handleCriticalityLevelsChange}
        onPeriodInDaysChange={handlePeriodInDaysChange}
        onTimeModeChange={handleTimeModeChange}
        onViewModeChange={handleViewModeChange}
        onViewLevelChange={handleViewLevelChange}
        onSelectedServiceChange={handleSelectedServiceChange}
        activeTileIds={activeTileIds}
      />
      <CSSTransition
        in={isSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.overlayTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.Overlay
          $isVisible={isSidebarOpen}
          $transitionClassName={s.overlayTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
          onClick={handleIssuesSidebarClose}
        />
      </CSSTransition>
      <CSSTransition
        in={isSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.sidebarContainerTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.IssuesSidebarContainer
          $transitionClassName={s.sidebarContainerTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
        >
          <IssuesSidebar
            onClose={handleIssuesSidebarClose}
            scope={scope}
            environmentId={selectedEnvironmentId ?? undefined}
            viewLevel={viewLevel}
          />
        </s.IssuesSidebarContainer>
      </CSSTransition>
    </s.Container>
  );
};
