import { InsightType } from "../../../types";
import { SpanScalingWellInsight } from "../types";

export interface NoScalingIssueInsightProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
