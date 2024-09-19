import { Severity } from "../../MetricsTable/types";
import { ReportTimeMode } from "../../ReportHeader/types";

export interface ServiceTileProps {
  name: string;
  criticalIssuesCount: number;
  criticality: number;
  severity: Severity;
  viewMode: ReportTimeMode;
  onIssuesClick?: (service: string) => void;
}
