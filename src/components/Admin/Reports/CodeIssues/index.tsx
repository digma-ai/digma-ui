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

export const CodeIssues = () => {
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

  const handleTileTitleClick = () =>
    // viewLevel: IssuesReportViewLevel,
    // value: string
    {
      // TODO: implement
    };

  const handleTileIssuesStatsClick = () =>
    // viewLevel: IssuesReportViewLevel,
    // value: string
    {
      // TODO: implement
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

  return (
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
    />
  );
};
