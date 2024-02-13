import { Mode } from "../../../globals";

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
  DOCKER_COMPOSE = "DockerCompose",
  DOCKER_EXTENSION = "DockerExtension"
}

export interface Environment {
  originalName: string;
  name: string;
}

export interface CodeDetails {
  displayName: string;
  codeObjectId: string;
  type: string;
}

export interface Scope {
  span: {
    displayName: string;
    spanCodeObjectId: string;
    serviceName: string | null;
  } | null;
  code: {
    relatedCodeDetailsList: CodeDetails[];
    codeDetailsList: CodeDetails[];
    isAlreadyAtCode: boolean;
  };
}

export interface ConfigContextData {
  digmaApiUrl: string;
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
  environment: Environment | undefined;
  backendInfo: BackendInfo | undefined;
  environments: Environment[] | undefined;
  scope: Scope | undefined;
  isMicrometerProject: boolean;
}
