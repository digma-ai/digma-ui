import { Environment } from "../../../common/App/types";
import { ReportFilterQuery } from "../types";

export interface ReportsHeaderProps {
  environments: Environment[];
  services: string[];
  onFilterChanged: (query: ReportFilterQuery) => void;
  onRefresh: () => void;
}
