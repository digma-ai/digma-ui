import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { SpanScalingInsufficientDataInsight } from "../../../../types";

export interface PerformanceAtScaleInsightProps extends InsightCardCommonProps {
  insight: SpanScalingInsufficientDataInsight;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
