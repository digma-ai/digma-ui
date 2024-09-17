import { ServiceData } from "../types";

export interface MetricsTableProps {
  data: ServiceData[];
}

export type ContentAlignment = "left" | "center" | "right";
export type Severity = "Critical" | "High" | "Medium" | "Low";

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
