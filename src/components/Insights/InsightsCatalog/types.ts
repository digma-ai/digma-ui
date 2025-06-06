import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { GenericCodeObjectInsight } from "../types";

export interface InsightsCatalogProps {
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onRefresh: () => void;
  onGoToTab: (tabId: string) => void;
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
