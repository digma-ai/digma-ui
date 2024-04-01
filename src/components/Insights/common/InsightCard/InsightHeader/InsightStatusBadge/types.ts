import { InsightStatus } from "../../../../types";

export interface InsightStatusBadgeProps {
  status: InsightStatus;
  className?: string;
}

export interface IndicatorProps {
  $status: InsightStatus;
}
