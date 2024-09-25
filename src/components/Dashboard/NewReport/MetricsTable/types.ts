import { ReportTimeMode } from "../ReportHeader/types";
import {
  PresentationalReportData,
  ReportViewLevel,
  ScoreCriterion
} from "../types";

export interface MetricsTableProps {
  data: PresentationalReportData[];
  timeMode: ReportTimeMode;
  onTitleClick: (name: string) => void;
  onIssuesStatsClick: (name: string) => void;
  scoreCriterion: ScoreCriterion;
  viewLevel: ReportViewLevel;
}

export type ContentAlignment = "left" | "center" | "right";
export type Severity = "Top" | "High" | "Medium" | "Low";

export interface ColumnMeta {
  contentAlign?: ContentAlignment;
  info?: string;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}

export interface TableBodyCellCellProps {
  $severity: Severity | null;
}
