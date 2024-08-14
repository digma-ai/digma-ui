import { InsightFilterType } from "../../InsightsCatalog/types";

export interface IssuesFilterEntry {
  enabled: boolean;
  name: string;
}

export interface IssuesFiltersData {
  issueTypeFilters: IssuesFilterEntry[];
  services?: string[];
}

export interface IssuesFilterQuery {
  issueTypes: string[];
  filters?: InsightFilterType[];
  services?: string[];
}
