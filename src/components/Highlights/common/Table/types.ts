import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T> {
  // highlight: HighlightData<GenericMetrics>;
  data: T[];
  columns: ColumnDef<T, any>[];
  id?: string;
}
