import type { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
}

export type ContentAlignment = "left" | "center" | "right";

export interface ColumnMeta {
  width: string | number;
  textAlign?: ContentAlignment;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}
