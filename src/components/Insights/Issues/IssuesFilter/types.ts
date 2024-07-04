import { IssuesQuery } from "../types";

export interface IssuesFilterProps {
  query: IssuesQuery;
  onApply: (filter: IssuesFilterQuery) => void;
}

export interface IssuesFilterEntry {
  enabled: boolean;
  name: string;
}

export interface IssuesFilterSectorEntry extends IssuesFilterEntry {
  selected: boolean;
}

export interface IssuesFiltersData {
  issuesTypes: IssuesFilterEntry[];
}

export interface IssuesFilterQuery {
  issueTypes: string[];
}
