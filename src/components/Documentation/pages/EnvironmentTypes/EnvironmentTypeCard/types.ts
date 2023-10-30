import { InsightCardType } from "./InsightCard/types";

export type EnvironmentStatus = "active" | "waiting-for-data";

export interface EnvironmentTypeCardProps {
  name: string;
  icon: JSX.Element;
  description?: string;
  status?: EnvironmentStatus;
  insights: { type: InsightCardType; count?: number; isDisabled?: boolean }[];
}
