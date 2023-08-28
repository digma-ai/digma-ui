import { InsightType } from "../../../types";
import { InsightProps, SpanScalingInsufficientDataInsight } from "../types";

export interface PerformanceAtScaleInsightProps extends InsightProps {
  insight: SpanScalingInsufficientDataInsight;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType
  ) => void;
}
