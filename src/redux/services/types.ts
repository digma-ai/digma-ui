import type {
  DeploymentType,
  EnvironmentType
} from "../../components/common/App/types";

export type IssueCriticality = "Low" | "Medium" | "High";

export interface GetAboutResponse {
  applicationVersion: string;
  deploymentType: DeploymentType;
  isCentralize: boolean;
  site?: string;
}

export interface GetUserProfileResponse {
  email: string;
}

export interface GetMetricsReportDataPayloadV1 {
  keys: {
    environment: string;
    service: string;
    lastDays: number | null;
  }[];
}

export interface GetMetricsReportDataPayloadV2 {
  criticalities: IssueCriticality[];
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
  criticalities: IssueCriticality[];
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

export type GetEnvironmentsResponse = {
  type: "Private" | "Public";
  id: string;
  name: string;
}[];

export interface GetEnvironmentServicesPayload {
  environment: string | null;
}

export type GetEnvironmentServicesResponse = string[];
