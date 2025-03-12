import type { InsightType } from "../../../../../../../types";
import type { SpanScalingInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanScalingInsightCardProps extends InsightCardCommonProps {
  insight: SpanScalingInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
}
