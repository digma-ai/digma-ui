import { Sorting } from "../../common/SortingSelector/types";
import { InsightFilterType } from "../InsightsCatalog/types";

export interface IssuesQuery {
  displayName: string | null;
  showDismissed: boolean;
  filters: InsightFilterType[];
  insightTypes?: string[];
  scopedSpanCodeObjectId?: string | null;
}

export interface GetIssuesQuery extends IssuesQuery {
  page: number;
  sorting: Sorting;
}
