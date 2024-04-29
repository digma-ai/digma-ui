import { InsightFilterType } from "../types";

export interface InsightStatsProps {
  onChange: (selected: InsightFilterType[]) => void;
  allIssuesCount: number;
  unreadCount: number;
  criticalCount: number;
}

export interface StatsProps {
  $selected?: boolean;
}
