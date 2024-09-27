import { ReportTimeMode } from "../ReportHeader/types";
import {
  PresentationalReportData,
  ReportViewLevel,
  ScoreCriterion
} from "../types";

export interface MetricsTableProps {
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
