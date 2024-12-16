import type { ColumnDef, Row } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  id?: string;
  onRowClick?: (row: Row<T>) => void;
}

export type ContentAlignment = "left" | "center" | "right";

export interface ColumnMeta {
  contentAlign?: ContentAlignment;
  info?: string;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}
