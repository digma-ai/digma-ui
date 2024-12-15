import type { GenericCodeObjectInsight } from "../types";

export interface InsightsCatalogProps {
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
}

export interface FilterButtonContainerProps {
  $isActive: boolean;
}

export enum ViewMode {
  All = "All",
  OnlyDismissed = "OnlyDismissed"
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  LATEST = "latest"
}

export interface PagedData<TData> {
  items: TData;
  totalCount: number;
}

export type InsightFilterType = "criticality" | "unread";
