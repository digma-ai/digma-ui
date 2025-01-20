import type {
  IssuesReportTimeMode,
  IssuesReportViewLevel
} from "../../../../redux/slices/issuesReportSlice";
import type { PresentationalReportData, ScoreCriterion } from "../types";

export interface ChartProps {
  data: PresentationalReportData[];
  onTitleClick: (value: string) => void;
  onIssuesStatsClick: (value: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: IssuesReportViewLevel;
  timeMode: IssuesReportTimeMode;
  activeTileIds?: string[];
}
