export interface IdeToolbarProps {
  incidentId: string;
}

export interface VSCodeExtensionInfo {
  ideName: string;
  ideUriScheme: string;
  ideVersion: string;
  workspace: string;
}

export type VSCodeIdeScanningResult = {
  port: number;
  response: VSCodeExtensionInfo;
}[];
