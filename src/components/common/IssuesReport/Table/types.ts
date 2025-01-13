import type {
  IssuesReportTimeMode,
  IssuesReportViewLevel
} from "../../../../redux/slices/issuesReportSlice";
import type { PresentationalReportData, ScoreCriterion } from "../types";

export interface TableProps {
  data: PresentationalReportData[];
  timeMode: IssuesReportTimeMode;
  onTitleClick: (value: string) => void;
  onIssuesStatsClick: (value: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: IssuesReportViewLevel;
}

export type ContentAlignment = "left" | "center" | "right";

export type Severity = "Top" | "High" | "Medium" | "Low";

export interface ColumnMeta {
  contentAlign?: ContentAlignment;
  info?: string;
  width?: string | number;
  minWidth?: string | number;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}

export interface TableBodyCellProps {
  $severity: Severity | null;
}
