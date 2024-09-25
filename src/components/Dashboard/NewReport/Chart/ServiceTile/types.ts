import { Severity } from "../../MetricsTable/types";
import { ReportTimeMode } from "../../ReportHeader/types";
import { ScoreCriterion } from "../../types";

export interface ServiceTileProps {
  name: string;
  criticalIssuesCount: number;
  scoreCriterion: ScoreCriterion;
  score: number;
  severity: Severity;
  viewMode: ReportTimeMode;
  onTitleClick?: (service: string) => void;
  onIssuesClick?: (service: string) => void;
}
