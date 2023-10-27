import { ViewMode } from "../EnvironmentPanel/types";
import { ActivityEntry, EntrySpan } from "../types";

export interface RecentActivityTableProps {
  data: ActivityEntry[];
  onSpanLinkClick: (span: EntrySpan) => void;
  onTraceButtonClick: (traceId: string, span: EntrySpan) => void;
  viewMode: ViewMode;
  isTraceButtonVisible: boolean;
  headerHeight: number;
}
