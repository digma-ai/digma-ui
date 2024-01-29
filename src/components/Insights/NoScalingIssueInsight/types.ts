import { InsightType } from "../../../types";
import { InsightProps, SpanScalingWellInsight } from "../types";

export interface NoScalingIssueInsightProps extends InsightProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
