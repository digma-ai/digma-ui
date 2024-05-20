import { InsightFilterType } from "../types";

export interface InsightStatsProps {
  onChange: (selected: InsightFilterType[]) => void;
  allIssuesCount?: number;
  unreadCount: number;
  criticalCount?: number;
  isLoading: boolean;
}

export interface StatsProps {
  $selected?: boolean;
}
