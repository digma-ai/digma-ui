export interface InsightTypeFilter {
  name: string;
  enabled: boolean;
}

export interface IssueFiltersData {
  issueTypeFilters: InsightTypeFilter[];
}
