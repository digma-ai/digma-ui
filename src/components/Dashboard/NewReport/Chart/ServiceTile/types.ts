import { Severity } from "../../MetricsTable/types";
import { ReportTimeMode } from "../../ReportHeader/types";

export interface ServiceTileProps {
  name: string;
  criticalIssuesCount: number;
  impactScore: number;
  severity: Severity;
  viewMode: ReportTimeMode;
  onIssuesClick?: (service: string) => void;
}
