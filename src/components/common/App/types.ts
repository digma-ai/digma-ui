import { Mode } from "../../../globals";
import { InsightFilterType } from "../../Insights/InsightsCatalog/types";
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
  centralize: boolean;
}

export enum DeploymentType {
  HELM = "Helm",
  DOCKER_COMPOSE = "DockerCompose",
  DOCKER_EXTENSION = "DockerExtension"
}

export type EnvironmentType = "Public" | "Private";

export interface Environment {
  id: string;
  name: string;
  type: EnvironmentType | null;
}

export interface CodeDetails {
  displayName: string;
  codeObjectId: string;
}

export interface ScopeSpan {
  displayName: string;
  spanCodeObjectId: string;
  methodId?: string;
  serviceName: string | null;
  role: "Entry" | "Internal" | "Unknown" | null;
}

export interface Scope {
  span: ScopeSpan | null;
  code: {
    relatedCodeDetailsList: CodeDetails[];
    codeDetailsList: CodeDetails[];
  };
  hasErrors: boolean;
  totalQueryResultCount: number;
  analyticsInsightsCount: number;
  unreadInsightsCount: number;
}

export interface InsightsQuery {
  displayName: string | null;
  sortBy: string;
  sortOrder: string;
  page: number;
  scopedSpanCodeObjectId?: string | null;
  showDismissed: boolean;
  insightViewType: InsightViewType;
  showUnreadOnly: boolean;
  filters: InsightFilterType[];
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
  digmaStatus?: DigmaStatus;
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
  backendInfo?: BackendInfo;
  environments?: Environment[];
  scope?: Scope;
  isMicrometerProject: boolean;
  state?: GlobalState;
  insightStats?: InsightStats;
  productKey: string;
  isDigmathonModeEnabled: boolean;
  userId: string;
  isDigmathonGameFinished: boolean;
  userInfo?: UserInfo;
}

export interface InsightStats {
  scope: {
    span: {
      spanCodeObjectId: string;
    };
  } | null;
  totalQueryResultCount: number;
  analyticsInsightsCount: number;
  unreadInsightsCount: number;
  criticalInsightsCount: number;
  allIssuesCount: number;
}

export interface UserInfo {
  id?: string;
}
