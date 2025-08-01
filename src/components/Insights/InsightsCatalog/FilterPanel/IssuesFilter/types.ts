import type { RefObject } from "react";
import type { IssueCriticality } from "../../../../../redux/services/types";
import type { InsightFilterType } from "../../types";

export interface IssuesFilterProps {
  popupBoundaryRef?: RefObject<HTMLElement>;
  width?: number;
}

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
  criticalityFilter?: IssueCriticality[];
  criticalityFilterInGlobalScope?: IssueCriticality[];
  lastDays?: number | null;
}
