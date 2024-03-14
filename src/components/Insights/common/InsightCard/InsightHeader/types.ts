import { SpanInfo } from "../../../../../types";
import { InsightStatus } from "../../../types";

export interface InsightHeaderProps {
  insightType: string;
  tags?: [];
  importance: number;
  isAsync?: boolean;
  isNew?: boolean;
  criticality: number;
  spanInfo?: SpanInfo | null;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  status?: InsightStatus;
  lastUpdateTimer?: string | null;
}
