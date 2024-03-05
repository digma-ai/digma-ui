import { SpanInfo } from "../../../../../types";

export interface InsightHeaderProps {
  insightType: string;
  isActive?: boolean;
  tags?: [];
  importance: number;
  isAsync?: boolean;
  isNew?: boolean;
  criticality: number;
  spanInfo?: SpanInfo | null;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
}
