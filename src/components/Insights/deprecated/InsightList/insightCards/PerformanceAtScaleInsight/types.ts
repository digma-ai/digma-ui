import type { InsightType } from "../../../../../../types";
import type { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import type { SpanScalingInsufficientDataInsight } from "../../../../types";

export interface PerformanceAtScaleInsightProps extends InsightCardCommonProps {
  insight: SpanScalingInsufficientDataInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
