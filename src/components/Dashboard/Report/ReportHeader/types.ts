import { ReportFilterQuery } from "../types";

export interface ReportHeaderProps {
  onFilterChanged: (query: ReportFilterQuery) => void;
  onRefresh: () => void;
}
