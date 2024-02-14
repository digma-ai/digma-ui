import { GenericCodeObjectInsight, InsightsQuery } from "../types";

export interface InsightsCatalogProps {
  insights: GenericCodeObjectInsight[];
  totalCount: number;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onQueryChange: (query: InsightsQuery) => void;
  defaultQuery: InsightsQuery;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  LATEST = "latest"
}

export interface PagedData<TData> {
  items: TData;
  totalCount: number;
}
