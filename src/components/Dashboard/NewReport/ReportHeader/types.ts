import { ReportFilterQuery } from "../types";

export interface GetServicesPayload {
  environment: string | null;
}

export interface ReportHeaderProps {
  onFilterChanged: (query: ReportFilterQuery) => void;
}
