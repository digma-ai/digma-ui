import { Mode } from "../../../globals";

export interface AppProps {
  children: React.ReactNode;
  theme?: Mode;
}

export type InstallationType =
  | "localEngine"
  | "dockerCompose"
  | "dockerDesktop"
  | "remote"
  | null;

export type DigmaStatus = {
  isRunning: boolean;
  type: InstallationType;
};

export interface ConfigContextData {
  digmaStatus: DigmaStatus | undefined;
  isObservabilityEnabled: boolean;
  isJaegerEnabled: boolean;
  isDigmaEngineInstalled: boolean;
  isDigmaEngineRunning: boolean;
  isDockerInstalled: boolean;
  isDockerComposeInstalled: boolean;
  userEmail: string;
}
