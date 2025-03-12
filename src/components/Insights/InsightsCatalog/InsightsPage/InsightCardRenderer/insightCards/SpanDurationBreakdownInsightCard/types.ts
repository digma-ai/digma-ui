import type { InsightType } from "../../../../../../../types";
import type { SpanDurationBreakdownInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanDurationBreakdownInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanDurationBreakdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}

export interface ColumnMeta {
  width: string | number;
  minWidth?: string | number;
  info?: string;
}
