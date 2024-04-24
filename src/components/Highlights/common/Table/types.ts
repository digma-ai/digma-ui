import { ColumnDef, Row } from "@tanstack/react-table";
import { CSSProperties } from "styled-components";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  id?: string;
  onRowClick?: (row: Row<T>) => void;
}

export interface ColumnMeta {
  headerCellStyle?: CSSProperties;
  bodyCellStyle?: CSSProperties;
}
