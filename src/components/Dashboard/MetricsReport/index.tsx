import { useEffect, useLayoutEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useMount } from "../../../hooks/useMount";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useMetricsReportSelector } from "../../../store/metricsReport/useMetricsReportSelector";
import { useStore } from "../../../store/useStore";
import { isString } from "../../../typeGuards/isString";
import { FeatureFlag, SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
import { actions } from "../actions";
import { Chart } from "./Chart";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import * as s from "./styles";
import { Table } from "./Table";
import {
  EndpointIssuesData,
  GetEndpointsIssuesPayload,
  ScoreCriterion,
  ServiceIssuesData,
  UseServicesIssuesDataProps
} from "./types";
import { useEndpointsIssuesData } from "./useEndpointsIssuesData";
import { useServicesIssuesData } from "./useServicesIssuesData";
import { transformEndpointsData, transformServicesData } from "./utils";

export const MetricsReport = () => {
  const { environments, backendInfo } = useConfigSelector();
  const {
    metricsReportViewLevel: viewLevel,
    metricsReportViewMode: viewMode,
    metricsReportTimeMode: timeMode,
    metricsReportSelectedEnvironmentId: selectedEnvironmentId,
    metricsReportSelectedService: selectedService,
    metricsReportSelectedServices: selectedServices,
    metricsReportSelectedCriticalityLevels: selectedCriticalityLevels,
    metricsReportSelectedPeriodInDays: selectedPeriodInDays,
    metricsReportSelectedEndpoints: selectedEndpoints,
    metricsReportServices: services,
    metricsReportServicesIssuesData: servicesIssuesData,
    metricsReportEndpointsIssuesData: endpointsIssuesData
  } = useMetricsReportSelector();

  const {
    setMetricsReportSelectedService: setSelectedService,
    setMetricsReportSelectedEnvironmentId: setSelectedEnvironmentId,
    setMetricsReportViewLevel: setViewLevel,
    setMetricsReportServicesIssuesData: setServicesIssuesData,
    setMetricsReportEndpointsIssuesData: setEndpointsIssuesData
  } = useStore.getState();

  const isCriticalityEnabled = Boolean(
    backendInfo &&
      getFeatureFlagValue(
        backendInfo,
        FeatureFlag.IS_METRICS_REPORT_CRITICALITY_ENABLED
      )
  );

  const scoreCriterion: ScoreCriterion = isCriticalityEnabled
    ? "criticality"
    : "impact";

  const isInitialized = environments && backendInfo;

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

  const useServiceIssuesDataPayload: UseServicesIssuesDataProps =
    useMemo(() => {
      return {
        environmentId: selectedEnvironmentId,
        services:
          selectedServices.length > 0 ? selectedServices : services ?? [],
        criticalities: selectedCriticalityLevels,
        lastDays: timeMode === "baseline" ? null : selectedPeriodInDays
      };
    }, [
      selectedEnvironmentId,
      selectedServices,
      selectedCriticalityLevels,
      selectedPeriodInDays,
      services,
      timeMode
    ]);

  const { data: servicesData } = useServicesIssuesData(
    useServiceIssuesDataPayload,
    Boolean(
      isInitialized &&
        selectedEnvironmentId &&
        services &&
        viewLevel === "services"
    )
  );

  useEffect(() => {
    if (servicesData) {
      setServicesIssuesData(servicesData.reports);
    }
  }, [servicesData, setServicesIssuesData]);

  const endpointsIssuesPayload: GetEndpointsIssuesPayload = useMemo(
    () => ({
      environment: selectedEnvironmentId ?? "",
      service: selectedService ?? "",
      endpoints: selectedEndpoints,
      criticalities: selectedCriticalityLevels,
      lastDays: timeMode === "baseline" ? null : selectedPeriodInDays
    }),
    [
      selectedEnvironmentId,
      selectedService,
      selectedEndpoints,
      selectedCriticalityLevels,
      selectedPeriodInDays,
      timeMode
    ]
  );
  const { data: endpointsData } = useEndpointsIssuesData(
    endpointsIssuesPayload,
    Boolean(
      isInitialized &&
        selectedEnvironmentId &&
        selectedService &&
        viewLevel === "endpoints"
    )
  );

  useEffect(() => {
    if (endpointsData) {
      setEndpointsIssuesData(endpointsData.reports);
    }
  }, [endpointsData, setEndpointsIssuesData]);

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

  const handleTitleClick = (value: string) => {
    if (viewLevel === "services") {
      setSelectedService(value);
      setViewLevel("endpoints");
    }

    if (viewLevel === "endpoints" && selectedEnvironmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: value,
        service: selectedService,
        environmentId: selectedEnvironmentId
      });
    }
  };

  const handleIssuesStatsClick = (value: string) => {
    if (viewLevel === "services") {
      changeScope({
        span: null,
        openMainPanel: true,
        environmentId: selectedEnvironmentId ?? undefined,
        context: {
          event: SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
          payload: {
            service: value
          }
        }
      });
    }

    if (viewLevel === "endpoints" && selectedEnvironmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: value,
        service: selectedService,
        environmentId: selectedEnvironmentId
      });
    }
  };

  const handleGoBack = () => {
    setViewLevel("services");
    setSelectedService(null);
  };

  const data =
    (viewLevel === "services" ? servicesIssuesData : endpointsIssuesData) ?? [];
  const transformedData =
    viewLevel === "services"
      ? transformServicesData(data as ServiceIssuesData[], scoreCriterion)
      : transformEndpointsData(data as EndpointIssuesData[], scoreCriterion);

  const renderContent = () => {
    if (
      (viewLevel === "services" && !servicesIssuesData) ||
      (viewLevel === "endpoints" && !endpointsIssuesData)
    ) {
      return <EmptyState type={"loading"} />;
    }

    if (data.length === 0) {
      if (viewLevel === "services") {
        return <EmptyState type={"noServices"} />;
      }

      if (viewLevel === "endpoints") {
        return <EmptyState type={"noEndpoints"} />;
      }
    }

    return (
      <>
        {viewMode === "table" && (
          <Table
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={timeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={viewLevel}
          />
        )}
        {viewMode === "treemap" && (
          <Chart
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={timeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={viewLevel}
          />
        )}
      </>
    );
  };

  return (
    <s.Section>
      <s.SectionBackground />
      <s.ContainerBackgroundGradient />
      <s.Container>
        {isInitialized ? (
          environments.length > 0 ? (
            <>
              <Header onGoBack={handleGoBack} />
              {renderContent()}
            </>
          ) : (
            <EmptyState type={"noData"} />
          )
        ) : (
          <EmptyState type={"loading"} />
        )}
        <s.Footer>
          <DigmaLogoIcon size={14} />
          <span>© {new Date().getFullYear()} digma.ai</span>
        </s.Footer>
      </s.Container>
    </s.Section>
  );
};
