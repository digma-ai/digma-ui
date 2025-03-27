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
  All,
  OnlyDismissed
}

export interface PagedData<TData> {
  items: TData;
  totalCount: number;
}

export type InsightFilterType = "criticality" | "unread";
