import { useLayoutEffect } from "react";
import {
  useDashboardDispatch,
  useDashboardSelector
} from "../../../containers/Dashboard/hooks";
import { useMount } from "../../../hooks/useMount";
import { type IssueCriticality } from "../../../redux/services/types";
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
} from "../../../redux/slices/issuesReportSlice";
import { isString } from "../../../typeGuards/isString";
import { SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { IssuesReport } from "../../common/IssuesReport";
import type { TargetScope } from "../../common/IssuesReport/types";
import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
import { actions } from "../actions";
import * as s from "./styles";

export const MetricsReport = () => {
  const selectedEnvironmentId = useDashboardSelector(
    (state) => state.metricsReport.selectedEnvironmentId
  );
  const criticalityLevels = useDashboardSelector(
    (state) => state.metricsReport.criticalityLevels
  );
  const periodInDays = useDashboardSelector(
    (state) => state.metricsReport.periodInDays
  );
  const selectedService = useDashboardSelector(
    (state) => state.metricsReport.selectedService
  );
  const selectedServices = useDashboardSelector(
    (state) => state.metricsReport.selectedServices
  );
  const viewLevel = useDashboardSelector(
    (state) => state.metricsReport.viewLevel
  );
  const viewMode = useDashboardSelector(
    (state) => state.metricsReport.viewMode
  );
  const timeMode = useDashboardSelector(
    (state) => state.metricsReport.timeMode
  );
  const selectedEndpoints = useDashboardSelector(
    (state) => state.metricsReport.selectedEndpoints
  );

  const dispatch = useDashboardDispatch();

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  useMount(() => {
    if (isString(window.dashboardEnvironment)) {
      setSelectedEnvironmentId(window.dashboardEnvironment);
    }
  });

  const goToEndpointIssues = ({
    spanCodeObjectId,
    service,
    environmentId
  }: {
    spanCodeObjectId: string;
    service: string;
    environmentId: string;
  }) => {
    changeScope({
      span: {
        spanCodeObjectId
      },
      environmentId,
      openMainPanel: true,
      context: {
        event: SCOPE_CHANGE_EVENTS.METRICS_ENDPOINT_SELECTED,
        payload: {
          service
        }
      }
    });
  };

  const handleTileTitleClick = (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    if (viewLevel === "endpoints" && selectedEnvironmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: target.value,
        service: selectedService,
        environmentId: selectedEnvironmentId
      });
    }
  };

  const handleIssuesStatsClick = (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    if (viewLevel === "services") {
      changeScope({
        span: null,
        openMainPanel: true,
        environmentId: selectedEnvironmentId ?? undefined,
        context: {
          event: SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
          payload: {
            service: target.value
          }
        }
      });
    }

    if (viewLevel === "endpoints" && selectedEnvironmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: target.value,
        service: selectedService,
        environmentId: selectedEnvironmentId
      });
    }
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
    <s.Container>
      <s.ContainerBackground />
      <s.ContainerBackgroundGradient />
      <s.ContentContainer>
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
          defaultHeaderTitle={"Issues Map"}
          onTileTitleClick={handleTileTitleClick}
          onTileIssuesStatsClick={handleIssuesStatsClick}
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
        <s.Footer>
          <DigmaLogoIcon size={14} />
          <span>© {new Date().getFullYear()} digma.ai</span>
        </s.Footer>
      </s.ContentContainer>
    </s.Container>
  );
};
