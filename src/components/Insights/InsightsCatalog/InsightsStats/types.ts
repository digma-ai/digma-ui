import { InsightFilterType } from "../types";

export interface InsightStatsProps {
  onChange: (selected: InsightFilterType[]) => void;
  totalCount: number;
  unreadCount: number;
  criticalCount: number;
}

export interface StatsProps {
  $selected?: boolean;
}
