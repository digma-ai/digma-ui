import { EnvironmentType } from "../../common/App/types";
import { Severity } from "./MetricsTable/types";

export type Criticality = "Low" | "Medium" | "High";

export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
  scope?: string;
  criticalities: Criticality[];
  lastDays: number | null;
  endpoints?: string[];
}

export interface ReportQuery {
  keys: {
    environment: string | null;
    service: string | null;
    lastDays: number | null;
  }[];
}

export interface GetServicesPayload {
  environment: string | null;
}

export interface ServiceData {
  key: {
    environment: string;
    service: string;
    lastDays: number | null;
  };
  issues: number;
  impact: number;
  criticality: number;
}

export interface ServiceMetricsReport {
  reports: ServiceData[];
}

export type ScoreCriterion = "impact" | "criticality";

export type ReportViewLevel = "services" | "endpoints";

export interface GetServiceEndpointsPayload {
  environment: string;
  service: string;
}

export interface SetServiceEndpointsPayload {
  endpoints: {
    displayName: string;
    spanCodeObjectId: string;
  }[];
}

export interface GetEndpointsIssuesPayload {
  environment: string;
  service: string;
  endpoints: string[];
  criticalities: Criticality[];
  lastDays: number | null;
}

export interface EndpointData {
  displayName: string;
  spanCodeObjectId: string;
  issues: number;
  impact: number;
  criticality: number;
}

export interface SetEndpointsIssuesPayload {
  reports: EndpointData[];
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
