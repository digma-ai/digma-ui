import type { DeploymentType } from "../../components/common/App/types";

export interface GetAboutResponse {
  applicationVersion: string;
  deploymentType: DeploymentType;
  isCentralize: boolean;
  site?: string;
}

export interface GetUserProfileResponse {
  email: string;
}

export type GetEnvironmentsResponse = {
  type: "Private" | "Public";
  id: string;
  name: string;
}[];

export type GetEnvironmentServicesResponse = string[];
