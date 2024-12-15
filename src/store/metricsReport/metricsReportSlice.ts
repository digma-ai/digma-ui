import { createSlice } from "zustand-slices";
import type {
  Criticality,
  EndpointData,
  EndpointIssuesData,
  ReportTimeMode,
  ReportViewLevel,
  ReportViewMode,
  ServiceIssuesData
} from "../../components/Dashboard/MetricsReport/types";
import type { Environment } from "../../components/common/App/types";

export interface MetricsReportState {
  metricsReportViewMode: ReportViewMode;
  metricsReportViewLevel: ReportViewLevel;
  metricsReportTimeMode: ReportTimeMode;
  metricsReportSelectedEnvironmentId: string | null;
  metricsReportSelectedService: string | null;
  metricsReportSelectedCriticalityLevels: Criticality[];
  metricsReportSelectedPeriodInDays: number;
  metricsReportSelectedEndpoints: string[];
  metricsReportSelectedServices: string[];
  metricsReportServices: string[] | null;
  metricsReportServicesIssuesData: ServiceIssuesData[] | null;
  metricsReportServiceEnvironments: Environment[] | null;
  metricsReportServiceEndpoints: EndpointData[] | null;
  metricsReportEndpointsIssuesData: EndpointIssuesData[] | null;
}

const initialState: MetricsReportState = {
  metricsReportViewMode: "treemap",
  metricsReportViewLevel: "services",
  metricsReportTimeMode: "baseline",
  metricsReportSelectedEnvironmentId: null,
  metricsReportSelectedService: null,
  metricsReportSelectedCriticalityLevels: ["Medium", "High"],
  metricsReportSelectedPeriodInDays: 7,
  metricsReportSelectedEndpoints: [],
  metricsReportSelectedServices: [],
  metricsReportServices: null,
  metricsReportServicesIssuesData: null,
  metricsReportServiceEnvironments: null,
  metricsReportServiceEndpoints: null,
  metricsReportEndpointsIssuesData: null
};

const set =
  (update: Partial<MetricsReportState>) => (state: MetricsReportState) => ({
    ...state,
    ...update
  });

export const metricsReportSlice = createSlice({
  name: "metricsReport",
  value: initialState,
  actions: {
    setMetricsReportViewMode: (viewMode: ReportViewMode) =>
      set({ metricsReportViewMode: viewMode }),
    setMetricsReportViewLevel: (viewLevel: ReportViewLevel) =>
      set({ metricsReportViewLevel: viewLevel }),
    setMetricsReportTimeMode: (timeMode: ReportTimeMode) =>
      set({ metricsReportTimeMode: timeMode }),
    setMetricsReportSelectedEnvironmentId: (environmentId: string) =>
      set({ metricsReportSelectedEnvironmentId: environmentId }),
    setMetricsReportSelectedService: (selectedService: string | null) =>
      set({ metricsReportSelectedService: selectedService }),
    setMetricsReportSelectedCriticalityLevels: (
      criticalityLevels: Criticality[]
    ) => set({ metricsReportSelectedCriticalityLevels: criticalityLevels }),
    setMetricsReportSelectedPeriodInDays: (periodInDays: number) =>
      set({ metricsReportSelectedPeriodInDays: periodInDays }),
    setMetricsReportSelectedEndpoints: (endpoints: string[]) =>
      set({ metricsReportSelectedEndpoints: endpoints }),
    setMetricsReportSelectedServices: (services: string[]) =>
      set({ metricsReportSelectedServices: services }),
    setMetricsReportServices: (services: string[] | null) =>
      set({ metricsReportServices: services }),
    setMetricsReportServicesIssuesData: (
      servicesData: ServiceIssuesData[] | null
    ) => set({ metricsReportServicesIssuesData: servicesData }),
    setMetricsReportServiceEnvironments: (environments: Environment[] | null) =>
      set({ metricsReportServiceEnvironments: environments }),
    setMetricsReportServiceEndpoints: (endpoints: EndpointData[] | null) =>
      set({ metricsReportServiceEndpoints: endpoints }),
    setMetricsReportEndpointsIssuesData: (data: EndpointIssuesData[] | null) =>
      set({ metricsReportEndpointsIssuesData: data }),
    resetMetricsReport: () => set(initialState)
  }
});
