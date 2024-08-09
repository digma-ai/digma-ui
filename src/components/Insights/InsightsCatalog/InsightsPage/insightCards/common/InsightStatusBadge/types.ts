import { InsightStatus } from "../../../../../types";

export interface InsightStatusBadgeProps {
  status: InsightStatus;
  className?: string;
  withLabel?: boolean;
}

export interface IndicatorProps {
  $status: InsightStatus;
}
