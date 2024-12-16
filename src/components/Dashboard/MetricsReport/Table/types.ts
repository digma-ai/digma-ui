import type {
  PresentationalReportData,
  ReportTimeMode,
  ReportViewLevel,
  ScoreCriterion
} from "../types";

export interface TableProps {
  data: PresentationalReportData[];
  timeMode: ReportTimeMode;
  onTitleClick: (value: string) => void;
  onIssuesStatsClick: (value: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: ReportViewLevel;
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
