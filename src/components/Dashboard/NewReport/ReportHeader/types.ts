import { ReportFilterQuery } from "../types";

export interface GetServicesPayload {
  environment: string | null;
}

export type ReportViewMode = "treemap" | "table";
export type ReportTimeMode = "baseline" | "changes";
export interface ReportHeaderProps {
  service?: string;
  onGoBack: () => void;
  onFilterChanged: (query: ReportFilterQuery) => void;
  onViewModeChanged: (viewMode: ReportViewMode) => void;
}
