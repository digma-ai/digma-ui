import { Mode } from "../../../globals";
import { InsightViewType } from "../../Insights/types";

export interface AppProps {
  children: React.ReactNode;
  theme?: Mode;
}

export type InstallationType =
  | "localEngine"
  | "dockerCompose"
  | "dockerDesktop";

export type DigmaStatus = {
  connection: {
    type: "local" | "remote" | null;
    status: boolean;
  };
  runningDigmaInstances: InstallationType[];
};

export interface BackendInfo {
  applicationVersion: string;
  deploymentType: DeploymentType;
}

export enum DeploymentType {
  HELM = "Helm",
  DOCKER_COMPOSE = "DockerCompose",
  DOCKER_EXTENSION = "DockerExtension"
}

export type EnvironmentType = "local" | "shared";

export interface Environment {
  originalName: string;
  name: string;
  type: EnvironmentType | null;
}

export interface CodeDetails {
  displayName: string;
  codeObjectId: string;
}

export interface Scope {
  span: {
    displayName: string;
    spanCodeObjectId: string;
    methodId?: string;
    serviceName: string | null;
    role: "Entry" | "Internal" | "Unknown" | null;
  } | null;
  code: {
    relatedCodeDetailsList: CodeDetails[];
    codeDetailsList: CodeDetails[];
  };
  hasErrors: boolean;
  issuesInsightsCount: number;
  analyticsInsightsCount: number;
}

export interface InsightsQuery {
  displayName: string | null;
  sortBy: string;
  sortOrder: string;
  page: number;
  scopedSpanCodeObjectId?: string | null;
  showDismissed: boolean;
  insightViewType: InsightViewType;
}

export interface GlobalState {
  insights?: {
    query?: InsightsQuery;
  };
  analytics?: {
    query?: InsightsQuery;
  };
}

export interface ConfigContextData {
  digmaApiUrl: string;
  digmaApiProxyPrefix: string;
  digmaStatus: DigmaStatus | undefined;
  isObservabilityEnabled: boolean;
  jaegerURL: string;
  isJaegerEnabled: boolean;
  isDigmaEngineInstalled: boolean;
  isDigmaEngineRunning: boolean;
  isDockerInstalled: boolean;
  isDockerComposeInstalled: boolean;
  userEmail: string;
  userRegistrationEmail: string;
  environment?: Environment | null;
  backendInfo: BackendInfo | undefined;
  environments: Environment[] | undefined;
  scope: Scope | undefined;
  isMicrometerProject: boolean;
  state?: GlobalState;
}
