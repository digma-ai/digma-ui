import type { Sorting } from "../../common/SortingSelector/types";
import type { InsightFilterType } from "../InsightsCatalog/types";

export interface GetIssuesFiltersQuery {
  displayName: string | null;
  showDismissed: boolean;
  filters: InsightFilterType[];
  insightTypes?: string[];
  services?: string[];
  scopedSpanCodeObjectId?: string | null;
}

export interface GetIssuesDataListQuery extends GetIssuesFiltersQuery {
  page: number;
  sorting: Sorting;
}
