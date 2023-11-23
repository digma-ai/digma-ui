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

export interface ConfigContextData {
  digmaApiUrl: string;
  digmaStatus: DigmaStatus | undefined;
  isObservabilityEnabled: boolean;
  isJaegerEnabled: boolean;
  isDigmaEngineInstalled: boolean;
  isDigmaEngineRunning: boolean;
  isDockerInstalled: boolean;
  isDockerComposeInstalled: boolean;
  userEmail: string;
  environment: string;
  backendInfo: BackendInfo | undefined;
}
