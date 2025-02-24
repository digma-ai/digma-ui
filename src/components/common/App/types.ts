import type { ReactNode } from "react";
import type { Theme } from "../../../globals";
import type { InsightFilterType } from "../../Insights/InsightsCatalog/types";
import type { InsightViewType } from "../../Insights/types";

export interface AppProps {
  children: ReactNode;
  theme?: Theme;
  id?: string;
}

export type InstallationType =
  | "localEngine"
  | "dockerCompose"
  | "dockerDesktop";

export interface DigmaStatus {
  connection: {
    type: "local" | "remote" | null;
    status: boolean;
  };
  runningDigmaInstances: InstallationType[];
}

export interface BackendInfo {
  applicationVersion: string;
  deploymentType: DeploymentType;
  centralize: boolean;
  site?: string;
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
  methodId: string | null;
  serviceName: string | null;
  role: "Entry" | "Internal" | "Unknown" | null;
}

export interface EnvironmentIssueCounts {
  highCriticality: number;
  mediumCriticality: number;
  lowCriticality: number;
}

export interface SpanEnvironment {
  environment: Environment;
  issueCounts: EnvironmentIssueCounts;
}

export interface Scope {
  span: ScopeSpan | null;
  code: {
    relatedCodeDetailsList: CodeDetails[];
    codeDetailsList: CodeDetails[];
  };
  hasErrors: boolean;
  issuesInsightsCount: number;
  analyticsInsightsCount: number;
  unreadInsightsCount: number;
  environmentId?: string;
  context?: {
    event: string;
    payload?: Record<string, unknown>;
  };
}

export interface CodeLens {
  id: string;
  codeMethod: string;
  scopeCodeObjectId: string;
  lensTitle: string;
  importance: number;
}

export interface ScopeWithCodeLensContext extends Omit<Scope, "context"> {
  context: {
    event: string;
    payload: {
      codeLens: CodeLens;
    };
  };
}

export interface ScopeWithCustomProtocolLinkContext
  extends Omit<Scope, "context"> {
  context: {
    event: string;
    payload: {
      targetTab?: string;
    };
  };
}

export interface ScopeWithErrorDetailsId extends Omit<Scope, "context"> {
  context: {
    event: string;
    payload: {
      id?: string;
    };
  };
}

/** @deprecated */
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

/** @deprecated */
export interface PersistedState {
  insights?: {
    query?: InsightsQuery;
  };
  analytics?: {
    query?: InsightsQuery;
  };
}

export interface RunConfiguration {
  environmentId: string | null;
  environmentName: string | null;
  environmentType: string | null;
  userId: string | null;
  observabilityMode: "Micrometer" | "OtelAgent" | null;
  isRunConfigurationSupported: boolean;
  javaToolOptions: string | null;
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
  environment?: Environment;
  backendInfo?: BackendInfo;
  environments?: Environment[];
  scope?: Scope;
  isMicrometerProject: boolean;
  state?: PersistedState;
  productKey: string;
  isDigmathonModeEnabled: boolean;
  userId: string;
  isDigmathonGameFinished: boolean;
  userInfo?: UserInfo;
  runConfig?: RunConfiguration;
  areInsightSuggestionsEnabled: boolean;
  googleClientId: string;
}

export interface UserInfo {
  id?: string;
}
