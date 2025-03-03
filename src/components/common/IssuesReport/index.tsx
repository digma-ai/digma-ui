import { useEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import {
  useGetAboutQuery,
  useGetEndpointsIssuesQuery,
  useGetEnvironmentServicesQuery,
  useGetEnvironmentsQuery,
  useGetServicesIssuesQuery
} from "../../../redux/services/digma";
import type {
  EndpointIssuesData,
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  ServiceIssuesData,
  SetEndpointsIssuesPayload
} from "../../../redux/services/types";
import { FeatureFlag } from "../../../types";
import { Chart } from "./Chart";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";
import * as s from "./styles";
import { Table } from "./Table";
import type { IssuesReportProps, ScoreCriterion } from "./types";
import {
  sortEnvironments,
  transformEndpointsData,
  transformServicesData
} from "./utils";

const getEndpointDisplayName = (
  endpointsIssues: SetEndpointsIssuesPayload | undefined,
  value: string
): string | undefined =>
  endpointsIssues?.reports.find((x) => x.spanCodeObjectId === value)
    ?.displayName;

export const IssuesReport = ({
  viewMode,
  viewLevel,
  timeMode,
  selectedEnvironmentId,
  selectedService,
  criticalityLevels,
  periodInDays,
  selectedEndpoints,
  selectedServices,
  defaultHeaderTitle,
  onSelectedEnvironmentIdChange,
  onSelectedServicesChange,
  onSelectedEndpointsChange,
  onCriticalityLevelsChange,
  onPeriodInDaysChange,
  onTimeModeChange,
  onViewModeChange,
  onTileTitleClick,
  onTileIssuesStatsClick,
  onSelectedServiceChange,
  activeTileIds,
  showEnvironmentSelect = true,
  showServicesSelect = true
}: IssuesReportProps) => {
  const { data: about } = useGetAboutQuery();
  const { data: environments } = useGetEnvironmentsQuery();

  const sortedEnvironments = useMemo(
    () => (environments ? sortEnvironments(environments) : undefined),
    [environments]
  );

  useEffect(() => {
    if (
      sortedEnvironments &&
      sortedEnvironments.length > 0 &&
      !selectedEnvironmentId
    ) {
      onSelectedEnvironmentIdChange(sortedEnvironments[0].id);
    }
  }, [
    sortedEnvironments,
    selectedEnvironmentId,
    onSelectedEnvironmentIdChange
  ]);

  const isInitialized = Boolean(sortedEnvironments && about);

  const { data: services } = useGetEnvironmentServicesQuery(
    {
      environment: selectedEnvironmentId ?? null
    },
    {
      skip: !selectedEnvironmentId || viewLevel !== "services"
    }
  );

  const isDataFilterEnabled = Boolean(
    about &&
      getFeatureFlagValue(
        about,
        FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
      )
  );

  const getServicesIssuesPayloadV1: GetMetricsReportDataPayloadV1 =
    useMemo(() => {
      const servicesArray =
        selectedServices.length > 0 ? selectedServices : services ?? [];

      return {
        keys: servicesArray.map((x) => ({
          environment: selectedEnvironmentId ?? "",
          service: x,
          lastDays: timeMode === "baseline" ? null : periodInDays
        }))
      };
    }, [
      selectedServices,
      services,
      selectedEnvironmentId,
      timeMode,
      periodInDays
    ]);

  const getServicesIssuesPayloadV2: GetMetricsReportDataPayloadV2 =
    useMemo(() => {
      const servicesArray =
        selectedServices.length > 0 ? selectedServices : services ?? [null];

      return {
        criticalities: criticalityLevels,
        keys: servicesArray.map((x) => ({
          environment: selectedEnvironmentId ?? "",
          service: x,
          lastDays: timeMode === "baseline" ? null : periodInDays
        }))
      };
    }, [
      selectedServices,
      services,
      selectedEnvironmentId,
      criticalityLevels,
      timeMode,
      periodInDays
    ]);

  const getServicesIssuesPayload = isDataFilterEnabled
    ? getServicesIssuesPayloadV2
    : getServicesIssuesPayloadV1;

  const { data: servicesIssues, isFetching: areServicesIssuesLoading } =
    useGetServicesIssuesQuery(getServicesIssuesPayload, {
      skip:
        !isInitialized ||
        !selectedEnvironmentId ||
        !services ||
        viewLevel !== "services"
    });

  const { data: endpointsIssues, isFetching: areEndpointIssuesLoading } =
    useGetEndpointsIssuesQuery(
      {
        environment: selectedEnvironmentId ?? "",
        service: selectedService ?? "",
        endpoints: selectedEndpoints.map((x) => x.spanCodeObjectId),
        criticalities: criticalityLevels,
        lastDays: timeMode === "baseline" ? null : periodInDays
      },
      {
        skip:
          !isInitialized ||
          !selectedEnvironmentId ||
          !selectedService ||
          viewLevel !== "endpoints"
      }
    );

  const isLoading = areServicesIssuesLoading || areEndpointIssuesLoading;

  const handleTitleClick = (value: string) => {
    if (viewLevel === "services") {
      onSelectedServiceChange(value);
    }

    const displayName =
      viewLevel === "endpoints"
        ? getEndpointDisplayName(endpointsIssues, value)
        : undefined;

    onTileTitleClick?.(viewLevel, { value, displayName });
  };

  const handleIssuesStatsClick = (value: string) => {
    const displayName =
      viewLevel === "endpoints"
        ? getEndpointDisplayName(endpointsIssues, value)
        : undefined;

    onTileIssuesStatsClick(viewLevel, { value, displayName });
  };

  const handleGoBack = () => {
    onSelectedServiceChange(null);
  };

  const isCriticalityEnabled = Boolean(
    about &&
      getFeatureFlagValue(
        about,
        FeatureFlag.IS_METRICS_REPORT_CRITICALITY_ENABLED
      )
  );

  const scoreCriterion: ScoreCriterion = isCriticalityEnabled
    ? "criticality"
    : "impact";

  const data =
    (viewLevel === "services"
      ? servicesIssues?.reports
      : endpointsIssues?.reports) ?? [];
  const transformedData =
    viewLevel === "services"
      ? transformServicesData(data as ServiceIssuesData[], scoreCriterion)
      : transformEndpointsData(data as EndpointIssuesData[], scoreCriterion);

  const renderContent = () => {
    if (
      (viewLevel === "services" && !servicesIssues) ||
      (viewLevel === "endpoints" && !endpointsIssues)
    ) {
      return <EmptyState preset={"loading"} />;
    }

    if (data.length === 0) {
      if (viewLevel === "services") {
        return <EmptyState preset={"noServices"} />;
      }

      if (viewLevel === "endpoints") {
        return <EmptyState preset={"noEndpoints"} />;
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
            activeTileIds={activeTileIds}
          />
        )}
      </>
    );
  };

  return (
    <s.Container>
      {isInitialized ? (
        sortedEnvironments && sortedEnvironments.length > 0 ? (
          <>
            <Header
              showEnvironmentSelect={showEnvironmentSelect}
              showServicesSelect={showServicesSelect}
              viewMode={viewMode}
              viewLevel={viewLevel}
              timeMode={timeMode}
              selectedEnvironmentId={selectedEnvironmentId}
              selectedService={selectedService}
              criticalityLevels={criticalityLevels}
              periodInDays={periodInDays}
              selectedEndpoints={selectedEndpoints}
              selectedServices={selectedServices}
              onSelectedEnvironmentIdChange={onSelectedEnvironmentIdChange}
              onSelectedServicesChange={onSelectedServicesChange}
              onSelectedEndpointsChange={onSelectedEndpointsChange}
              onCriticalityLevelsChange={onCriticalityLevelsChange}
              onPeriodInDaysChange={onPeriodInDaysChange}
              onTimeModeChange={onTimeModeChange}
              onViewModeChange={onViewModeChange}
              onGoBack={handleGoBack}
              defaultTitle={defaultHeaderTitle}
            />
            {isLoading ? <EmptyState preset={"loading"} /> : renderContent()}
          </>
        ) : (
          <EmptyState preset={"noData"} />
        )
      ) : (
        <EmptyState preset={"loading"} />
      )}
    </s.Container>
  );
};
