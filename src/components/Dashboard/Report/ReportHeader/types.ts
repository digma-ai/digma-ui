import type { ReportFilterQuery } from "../types";

export interface ReportHeaderProps {
  onFilterChange: (query: ReportFilterQuery) => void;
  onRefresh: () => void;
}
