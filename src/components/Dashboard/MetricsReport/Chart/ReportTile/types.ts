import type { Severity } from "../../Table/types";
import type { ReportTimeMode, ScoreCriterion } from "../../types";

export interface ReportTileProps {
  name: string;
  criticalIssuesCount: number;
  scoreCriterion: ScoreCriterion;
  score: number;
  severity: Severity;
  viewMode: ReportTimeMode;
  onTitleClick?: () => void;
  onIssuesClick?: () => void;
}
