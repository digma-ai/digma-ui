import {
  PresentationalReportData,
  ReportTimeMode,
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
