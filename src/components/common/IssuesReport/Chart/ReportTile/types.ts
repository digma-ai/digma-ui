import type { IssuesReportTimeMode } from "../../../../../redux/slices/issuesReportSlice";
import type { Severity } from "../../Table/types";
import type { ScoreCriterion } from "../../types";

export interface ReportTileProps {
  name: string;
  criticalIssuesCount: number;
  scoreCriterion: ScoreCriterion;
  score: number;
  severity: Severity;
  timeMode: IssuesReportTimeMode;
  onTitleClick?: () => void;
  onIssuesClick?: () => void;
}
