import { useEffect } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import {
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
import { Chart } from "../../../Dashboard/MetricsReport/Chart";
import { EmptyState } from "../../../Dashboard/MetricsReport/EmptyState";
import { Table } from "../../../Dashboard/MetricsReport/Table";
import type {
  EndpointIssuesData,
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
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const selectedCriticalityLevels = useAdminSelector(
    (state) => state.codeIssuesReport.selectedCriticalityLevels
  );
  const selectedPeriodInDays = useAdminSelector(
    (state) => state.codeIssuesReport.selectedPeriodInDays
  );
  const selectedService = useAdminSelector(
    (state) => state.codeIssuesReport.selectedService
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const selectedViewLevel = useAdminSelector(
    (state) => state.codeIssuesReport.viewLevel
  );
  const selectedViewMode = useAdminSelector(
    (state) => state.codeIssuesReport.viewMode
  );
  const selectedTimeMode = useAdminSelector(
    (state) => state.codeIssuesReport.timeMode
  );
  const selectedEndpoints = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEndpoints
  );

  const dispatch = useAdminDispatch();

  const { data: services } = useGetEnvironmentServicesQuery(
    {
      environment: selectedEnvironmentId ?? null
    },
    {
      skip: !selectedEnvironmentId || selectedViewLevel !== "services"
    }
  );

  const { data: environments } = useGetEnvironmentsQuery();

  const isInitialized = environments;

  const { data: servicesIssues } = useGetServicesIssuesQuery(
    {
      criticalities: selectedCriticalityLevels,
      keys: (selectedServices.length > 0
        ? selectedServices
        : services ?? []
      ).map((x) => ({
        environment: selectedEnvironmentId ?? "",
        service: x,
        lastDays: selectedTimeMode === "baseline" ? null : selectedPeriodInDays
      }))
    },
    {
      skip:
        !isInitialized ||
        !selectedEnvironmentId ||
        !selectedServices ||
        selectedViewLevel !== "services"
    }
  );

  useEffect(() => {
    if (environments && environments.length > 0 && !selectedEnvironmentId) {
      dispatch(setSelectedEnvironmentId(environments[0].id));
    }
  }, [environments, selectedEnvironmentId, dispatch]);

  const { data: endpointsIssues } = useGetEndpointsIssuesQuery(
    {
      environment: selectedEnvironmentId ?? "",
      service: selectedService ?? "",
      endpoints: selectedEndpoints,
      criticalities: selectedCriticalityLevels,
      lastDays: selectedTimeMode === "baseline" ? null : selectedPeriodInDays
    },
    {
      skip:
        !isInitialized ||
        !selectedEnvironmentId ||
        !selectedService ||
        selectedViewLevel !== "endpoints"
    }
  );

  // const isCriticalityEnabled = Boolean(
  //   backendInfo &&
  //     getFeatureFlagValue(
  //       backendInfo,
  //       FeatureFlag.IS_METRICS_REPORT_CRITICALITY_ENABLED
  //     )
  // );

  // TODO: support feature flags
  const isCriticalityEnabled = true;

  const scoreCriterion: ScoreCriterion = isCriticalityEnabled
    ? "criticality"
    : "impact";

  // && backendInfo;

  // const useServiceIssuesDataPayload: UseServicesIssuesDataProps =
  //   useMemo(() => {
  //     return {
  //       environmentId: selectedEnvironmentId,
  //       services:
  //         selectedServices.length > 0 ? selectedServices : services ?? [],
  //       criticalities: selectedCriticalityLevels,
  //       lastDays: timeMode === "baseline" ? null : selectedPeriodInDays
  //     };
  //   }, [
  //     selectedEnvironmentId,
  //     selectedServices,
  //     selectedCriticalityLevels,
  //     selectedPeriodInDays,
  //     services,
  //     timeMode
  //   ]);

  // const { data: servicesData } = useServicesIssuesData(
  //   useServiceIssuesDataPayload,
  //   Boolean(
  //     isInitialized &&
  //       selectedEnvironmentId &&
  //       services &&
  //       viewLevel === "services"
  //   )
  // );

  // useEffect(() => {
  //   if (servicesData) {
  //     setServicesIssuesData(servicesData.reports);
  //   }
  // }, [servicesData, setServicesIssuesData]);

  // const endpointsIssuesPayload: GetEndpointsIssuesPayload = useMemo(
  //   () => ({
  //     environment: selectedEnvironmentId ?? "",
  //     service: selectedService ?? "",
  //     endpoints: selectedEndpoints,
  //     criticalities: selectedCriticalityLevels,
  //     lastDays: timeMode === "baseline" ? null : selectedPeriodInDays
  //   }),
  //   [
  //     selectedEnvironmentId,
  //     selectedService,
  //     selectedEndpoints,
  //     selectedCriticalityLevels,
  //     selectedPeriodInDays,
  //     timeMode
  //   ]
  // );
  // const { data: endpointsData } = useEndpointsIssuesData(
  //   endpointsIssuesPayload,
  //   Boolean(
  //     isInitialized &&
  //       selectedEnvironmentId &&
  //       selectedService &&
  //       viewLevel === "endpoints"
  //   )
  // );

  // useEffect(() => {
  //   if (endpointsData) {
  //     setEndpointsIssuesData(endpointsData.reports);
  //   }
  // }, [endpointsData, setEndpointsIssuesData]);

  const handleTitleClick = (value: string) => {
    if (selectedViewLevel === "services") {
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

  const data =
    (selectedViewLevel === "services"
      ? servicesIssues?.reports
      : endpointsIssues?.reports) ?? [];
  const transformedData =
    selectedViewLevel === "services"
      ? transformServicesData(data as ServiceIssuesData[], scoreCriterion)
      : transformEndpointsData(data as EndpointIssuesData[], scoreCriterion);

  const renderContent = () => {
    if (
      (selectedViewLevel === "services" && !servicesIssues) ||
      (selectedViewLevel === "endpoints" && !endpointsIssues)
    ) {
      return <EmptyState preset={"loading"} />;
    }

    if (data.length === 0) {
      if (selectedViewLevel === "services") {
        return <EmptyState preset={"noServices"} />;
      }

      if (selectedViewLevel === "endpoints") {
        return <EmptyState preset={"noEndpoints"} />;
      }
    }

    return (
      <>
        {selectedViewMode === "table" && (
          <Table
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={selectedTimeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={selectedViewLevel}
          />
        )}
        {selectedViewMode === "treemap" && (
          <Chart
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={selectedTimeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={selectedViewLevel}
          />
        )}
      </>
    );
  };

  return (
    <s.Section>
      <s.Container>
        {isInitialized ? (
          environments.length > 0 ? (
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
