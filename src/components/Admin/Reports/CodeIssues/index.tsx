import { useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import type {
  GetIssuesPayload,
  IssueCriticality
} from "../../../../redux/services/types";
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
import { IssuesSidebarOverlay } from "../../common/IssuesSidebarOverlay";
import * as s from "./styles";

export const MIN_SIDEBAR_WIDTH = 382; // in pixels
export const MAX_SIDEBAR_WIDTH = 640; // in pixels
export const DEFAULT_SIDEBAR_WIDTH_RATIO = 0.33;

export const getDefaultSidebarWidth = (windowWidth: number) => {
  const defaultWidth = windowWidth * DEFAULT_SIDEBAR_WIDTH_RATIO;
  if (defaultWidth > MAX_SIDEBAR_WIDTH) {
    return MAX_SIDEBAR_WIDTH;
  }

  if (defaultWidth < MIN_SIDEBAR_WIDTH) {
    return MIN_SIDEBAR_WIDTH;
  }

  return defaultWidth;
};

export const CodeIssues = () => {
  const [isIssuesSidebarOpen, setIsIssuesSidebarOpen] = useState(false);
  const [scope, setScope] = useState<TargetScope>();
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

  const query: Partial<GetIssuesPayload> = useMemo(
    () => ({
      environment: selectedEnvironmentId ?? undefined,
      scopedSpanCodeObjectId:
        viewLevel === "endpoints" ? scope?.value : undefined,
      services:
        viewLevel === "services"
          ? scope?.value
            ? [scope.value]
            : []
          : viewLevel === "endpoints" && selectedService
          ? [selectedService]
          : []
    }),
    [scope?.value, viewLevel, selectedEnvironmentId, selectedService]
  );

  const issuesSidebarQuery = useMemo(
    () => ({
      query
    }),
    [query]
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
      <IssuesSidebarOverlay
        isSidebarOpen={isIssuesSidebarOpen}
        onSidebarClose={handleIssuesSidebarClose}
        issuesSidebarQuery={issuesSidebarQuery}
        scopeDisplayName={scope?.displayName ?? scope?.value}
      />
    </s.Container>
  );
};
