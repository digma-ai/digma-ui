import type {
  RecentActivityEntry,
  SlimEntrySpanData
} from "../../../redux/services/types";
import type { ViewMode } from "../EnvironmentPanel/types";

export interface RecentActivityTableProps {
  data: RecentActivityEntry[];
  onSpanLinkClick: (span: SlimEntrySpanData) => void;
  onTraceButtonClick: (traceId: string, span: SlimEntrySpanData) => void;
  viewMode: ViewMode;
  isTraceButtonVisible: boolean;
  headerHeight: number;
  now: number;
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
