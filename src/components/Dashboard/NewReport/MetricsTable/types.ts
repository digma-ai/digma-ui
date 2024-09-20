import { ScoreCriterion, ServiceData } from "../types";

export interface MetricsTableProps {
  data: ServiceData[];
  showSign: boolean;
  onServiceSelected: (name: string) => void;
  scoreCriterion: ScoreCriterion;
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
