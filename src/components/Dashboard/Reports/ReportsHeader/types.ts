import { ReportFilterQuery } from "../types";

export interface ReportsHeaderProps {
  onFilterChanged: (query: ReportFilterQuery) => void;
  onRefresh: () => void;
}
