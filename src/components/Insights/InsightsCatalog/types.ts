import {
  GenericCodeObjectInsight,
  InsightViewType,
  InsightsQuery
} from "../types";

export interface InsightsCatalogProps {
  insightViewType: InsightViewType;
  insights: GenericCodeObjectInsight[];
  totalCount: number;
  dismissedCount?: number;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onQueryChange: (query: InsightsQuery) => void;
  defaultQuery: InsightsQuery;
  onRefresh: () => void;
  unreadCount?: number;
}

export enum ViewMode {
  All,
  OnlyDismissed
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  LATEST = "latest"
}

export interface PagedData<TData> {
  items: TData;
  totalCount: number;
}

export type InsightFilterType = "criticality" | "unread" | null;
