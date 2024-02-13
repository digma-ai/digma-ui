import { Sorting } from "../../common/SortingSelector/types";
import { GenericCodeObjectInsight, InsightsData } from "../types";

export interface InsightsCatalogProps {
  data: PagedData<InsightsData>;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  loadData: (query: InsightsQuery) => void;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  LATEST = "latest"
}

export interface InsightsQuery {
  page: number;
  sorting: Sorting;
  searchQuery: string | null;
}

export interface PagedData<TData> {
  items: TData;
  totalCount: number;
}
