import type { ViewMode } from "../EnvironmentPanel/types";
import type { ActivityEntry, EntrySpan } from "../types";

export interface RecentActivityTableProps {
  data: ActivityEntry[];
  onSpanLinkClick: (span: EntrySpan) => void;
  onTraceButtonClick: (traceId: string, span: EntrySpan) => void;
  viewMode: ViewMode;
  isTraceButtonVisible: boolean;
  headerHeight: number;
}

export interface ColumnMeta {
  width: string | number;
  minWidth?: string | number;
  textAlign?: "left" | "center" | "right";
}

export interface TableHeadProps {
  $offset: number;
}

export interface TableBodyRowProps {
  $isRecent: boolean;
}

export type ListItemProps = TableBodyRowProps;
