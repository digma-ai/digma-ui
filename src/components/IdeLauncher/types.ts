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
