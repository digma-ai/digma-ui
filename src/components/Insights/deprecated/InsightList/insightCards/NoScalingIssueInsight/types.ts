import type { InsightType } from "../../../../../../types";
import type { SpanScalingWellInsight } from "../../../../types";
import type { InsightCardCommonProps } from "../../types";

export interface NoScalingIssueInsightProps extends InsightCardCommonProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
