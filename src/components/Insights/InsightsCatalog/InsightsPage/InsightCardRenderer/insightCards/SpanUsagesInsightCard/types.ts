import type { InsightType } from "../../../../../../../types";
import type { SpanUsagesInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanUsagesInsightCardProps extends InsightCardCommonProps {
  insight: SpanUsagesInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}

export interface ColumnMeta {
  width: string | number;
  minWidth?: string | number;
}
