import type { InsightFilterType } from "../../types";

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
  issueTypesInGlobalScope?: string[];
  filters?: InsightFilterType[];
  services?: string[];
}
