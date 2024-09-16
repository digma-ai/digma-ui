import { ServiceData } from "../types";

export interface MetricsTableProps {
  data: ServiceData[];
}

export type ContentAlignment = "left" | "center" | "right";

export interface ColumnMeta {
  contentAlign?: ContentAlignment;
  info?: string;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}
