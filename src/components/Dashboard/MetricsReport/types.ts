import { EnvironmentType } from "../../common/App/types";
import { Severity } from "./Table/types";

export type Criticality = "Low" | "Medium" | "High";

export type ReportViewMode = "treemap" | "table";

export type ReportTimeMode = "baseline" | "changes";

export type ScoreCriterion = "impact" | "criticality";

export type ReportViewLevel = "services" | "endpoints";

export interface UseServicesIssuesDataProps {
  environmentId: string | null;
  services: string[];
  criticalities: Criticality[];
  lastDays: number | null;
}

export interface GetMetricsReportDataPayloadV1 {
  keys: {
    environment: string;
    service: string;
    lastDays: number | null;
  }[];
}

export interface GetMetricsReportDataPayloadV2 {
  criticalities: Criticality[];
  keys: {
    environment: string;
    service: string | null;
    lastDays: number | null;
  }[];
}

export interface ServiceIssuesData {
  key: {
    environment: string;
    service: string;
    lastDays: number | null;
  };
  issues: number;
  impact: number;
  criticality: number;
}

export interface SetMetricsReportDataPayload {
  reports: ServiceIssuesData[];
}

export interface GetServiceEndpointsPayload {
  environment: string;
  service: string;
}

export interface EndpointData {
  displayName: string;
  spanCodeObjectId: string;
}

export interface SetServiceEndpointsPayload {
  endpoints: EndpointData[];
}

export interface GetEndpointsIssuesPayload {
  environment: string;
  service: string;
  endpoints: string[];
  criticalities: Criticality[];
  lastDays: number | null;
}

export interface EndpointIssuesData {
  displayName: string;
  spanCodeObjectId: string;
  issues: number;
  impact: number;
  criticality: number;
}

export interface SetEndpointsIssuesPayload {
  reports: EndpointIssuesData[];
}

export interface GetServiceEnvironmentsPayload {
  service: string;
}

export interface SetServiceEnvironmentsPayload {
  environments: {
    id: string;
    name: string;
    type: EnvironmentType;
  }[];
}

export interface PresentationalReportData {
  id: string;
  name: string;
  score: number;
  criticalIssuesCount: number;
  severity: Severity;
}
