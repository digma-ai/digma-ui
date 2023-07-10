import { InsightType } from "../../../types";
import { InsightProps, SpanScalingWellInsight } from "../types";

export interface NoScalingIssueInsightProps extends InsightProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
