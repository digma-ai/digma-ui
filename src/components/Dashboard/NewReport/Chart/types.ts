import { ReportTimeMode } from "../ReportHeader/types";
import {
  PresentationalReportData,
  ReportViewLevel,
  ScoreCriterion
} from "../types";

export interface ChartProps {
  data: PresentationalReportData[];
  onTitleClick: (name: string) => void;
  onIssuesStatsClick: (name: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: ReportViewLevel;
  timeMode: ReportTimeMode;
}
