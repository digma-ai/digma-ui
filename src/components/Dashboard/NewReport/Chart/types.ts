import { ReportTimeMode } from "../ReportHeader/types";
import {
  PresentationalReportData,
  ReportViewLevel,
  ScoreCriterion
} from "../types";

export interface ChartProps {
  data: PresentationalReportData[];
  onTitleClick: (value: string) => void;
  onIssuesStatsClick: (value: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: ReportViewLevel;
  timeMode: ReportTimeMode;
}
