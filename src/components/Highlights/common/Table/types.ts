import { ColumnDef, Row } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  id?: string;
  onRowClick?: (row: Row<T>) => void;
}
