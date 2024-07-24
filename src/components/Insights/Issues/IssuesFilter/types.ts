import { InsightFilterType } from "../../InsightsCatalog/types";

export interface IssuesFilterEntry {
  enabled: boolean;
  name: string;
}

export interface IssuesFiltersData {
  issueTypeFilters: IssuesFilterEntry[];
}

export interface IssuesFilterQuery {
  issueTypes: string[];
  filters: InsightFilterType[];
}
