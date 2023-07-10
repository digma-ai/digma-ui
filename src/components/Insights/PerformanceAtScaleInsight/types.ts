import { InsightType } from "../../../types";
import { InsightProps, SpanScalingInsufficientDataInsight } from "../types";

export interface PerformanceAtScaleInsightProps extends InsightProps {
  insight: SpanScalingInsufficientDataInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
