export interface PluginInfo {
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

export interface ShowIdeProjectResult {
  result: "success" | "failure";
  error?: { message: string };
}

export type IdeScanningResult = { port: number; response: PluginInfo }[];
