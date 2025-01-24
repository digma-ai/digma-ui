import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import type { IssueCriticality } from "../../../../redux/services/types";
import {
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
  const [isIssuesSidebarOpen, setIsIssuesSidebarOpen] = useState(false);
  const [scope, setScope] = useState<{ value: string; displayName?: string }>();
  const [activeTileIds, setActiveTileIds] = useState<string[] | undefined>(
    undefined
  );
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isIssuesSidebarTransitioning, setIsIssuesSidebarTransitioning] =
    useState(false);

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

  const handleTileTitleClick = (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    if (viewMode === "table" && viewLevel === "endpoints") {
      setScope(target);
      setIsIssuesSidebarOpen(true);
      setActiveTileIds([target.value]);
    }
  };

  const handleTileIssuesStatsClick = (
    _: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    setScope(target);
    setIsIssuesSidebarOpen(true);
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
    setIsIssuesSidebarOpen(false);
    setActiveTileIds(undefined);
  };

  const handleIssuesSidebarTransitionStart = () => {
    setIsIssuesSidebarTransitioning(true);
  };

  const handleIssuesSidebarTransitionEnd = () => {
    setIsIssuesSidebarTransitioning(false);
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
        in={isIssuesSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.overlayTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={overlayRef}
      >
        <s.Overlay
          ref={overlayRef}
          $isVisible={isIssuesSidebarOpen}
          $transitionClassName={s.overlayTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
          onClick={handleIssuesSidebarClose}
        />
      </CSSTransition>
      <CSSTransition
        in={isIssuesSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.sidebarContainerTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={sidebarContainerRef}
        onEnter={handleIssuesSidebarTransitionStart}
        onEntered={handleIssuesSidebarTransitionEnd}
        onExit={handleIssuesSidebarTransitionStart}
        onExited={handleIssuesSidebarTransitionEnd}
      >
        <s.IssuesSidebarContainer
          ref={sidebarContainerRef}
          $transitionClassName={s.sidebarContainerTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
        >
          <IssuesSidebar
            onClose={handleIssuesSidebarClose}
            scope={scope}
            environmentId={selectedEnvironmentId ?? undefined}
            viewLevel={viewLevel}
            isTransitioning={isIssuesSidebarTransitioning}
          />
        </s.IssuesSidebarContainer>
      </CSSTransition>
    </s.Container>
  );
};
