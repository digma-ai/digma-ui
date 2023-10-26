import { InsightType } from "../../../../types";
import { EnvironmentStatus } from "./EnvironmentTypeCard/types";

export interface EnvironmentTypeData {
  id: string;
  icon: JSX.Element;
  name: string;
  description?: string;
  status?: EnvironmentStatus;
  insights: { type: InsightType; count?: number; isDisabled?: boolean }[];
}
