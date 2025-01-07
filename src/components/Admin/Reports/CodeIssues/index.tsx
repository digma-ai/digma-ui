import { useEffect, useMemo } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../../../featureFlags";
import {
  useGetAboutQuery,
  useGetEndpointsIssuesQuery,
  useGetEnvironmentServicesQuery,
  useGetEnvironmentsQuery,
  useGetServicesIssuesQuery
} from "../../../../redux/services/digma";
import {
  setSelectedEnvironmentId,
  setSelectedService,
  setViewLevel
} from "../../../../redux/slices/codeIssuesReportSlice";
import { FeatureFlag } from "../../../../types";
import { Chart } from "../../../Dashboard/MetricsReport/Chart";
import { EmptyState } from "../../../Dashboard/MetricsReport/EmptyState";
import { Table } from "../../../Dashboard/MetricsReport/Table";
import type {
  EndpointIssuesData,
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  ScoreCriterion,
  ServiceIssuesData
} from "../../../Dashboard/MetricsReport/types";
import {
  transformEndpointsData,
  transformServicesData
} from "../../../Dashboard/MetricsReport/utils";
import { Header } from "./Header";
import * as s from "./styles";

export const CodeIssues = () => {
  // TODO: create selectors
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

  const { data: about } = useGetAboutQuery();

  const { data: environments } = useGetEnvironmentsQuery();

  useEffect(() => {
    if (environments && environments.length > 0 && !selectedEnvironmentId) {
      dispatch(setSelectedEnvironmentId(environments[0].id));
    }
  }, [environments, selectedEnvironmentId, dispatch]);

  const isInitialized = Boolean(environments && about);

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

  const { data: servicesIssues } = useGetServicesIssuesQuery(
    getServicesIssuesPayload,
    {
      skip:
        !isInitialized ||
        !selectedEnvironmentId ||
        !services ||
        viewLevel !== "services"
    }
  );

  const { data: endpointsIssues } = useGetEndpointsIssuesQuery(
    {
      environment: selectedEnvironmentId ?? "",
      service: selectedService ?? "",
      endpoints: selectedEndpoints,
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

  const handleTitleClick = (value: string) => {
    if (viewLevel === "services") {
      dispatch(setSelectedService(value));
      dispatch(setViewLevel("endpoints"));
    }

    // TODO: make optional for endpoints
  };

  const handleIssuesStatsClick = () => {
    // TODO: remove and make optional
  };

  const handleGoBack = () => {
    dispatch(setViewLevel("services"));
    dispatch(setSelectedService(null));
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
          />
        )}
      </>
    );
  };

  return (
    <s.Section>
      <s.Container>
        {isInitialized ? (
          environments && environments.length > 0 ? (
            <>
              <Header onGoBack={handleGoBack} />
              {renderContent()}
            </>
          ) : (
            <EmptyState preset={"noData"} />
          )
        ) : (
          <EmptyState preset={"loading"} />
        )}
      </s.Container>
    </s.Section>
  );
};
