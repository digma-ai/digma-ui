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

export interface ShowIntellijIdeProjectResult {
  result: "success" | "failure";
  error?: { message: string };
}

export type IntellijIdeScanningResult = {
  port: number;
  response: IntellijPluginInfo;
}[];
