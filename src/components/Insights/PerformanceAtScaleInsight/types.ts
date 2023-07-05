import { InsightType } from "../../../types";
import { SpanScalingInsufficientDataInsight } from "../types";

export interface PerformanceAtScaleInsightProps {
  insight: SpanScalingInsufficientDataInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
