export interface IntellijPluginInfo {
  name: string;
  productName: string;
  edition: string;
  baselineVersion: number;
  buildNumber?: string;
  pluginVersion: string;
  backendVersion: string;
  backendDeploymentType: string;
  isCentralized: boolean;
  openProjects: string[];
}

export interface VSCodeExtensionInfo {
  ideName: string;
  ideUriScheme: string;
  ideVersion: string;
  workspace: string;
}

export interface ShowIntellijIdeProjectResult {
  result: "success" | "failure";
  error?: { message: string };
}

export interface AddChatContextFileResult {
  result: "success" | "failure";
  error?: { message: string };
}

export type IntellijIdeScanningResult = {
  port: number;
  response: IntellijPluginInfo;
}[];

export type VSCodeIdeScanningResult = {
  port: number;
  response: VSCodeExtensionInfo;
}[];
