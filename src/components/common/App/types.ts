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
