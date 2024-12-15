import type { InsightType } from "../../../../../../types";
import type { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import type { SpanScalingWellInsight } from "../../../../types";

export interface NoScalingIssueInsightProps extends InsightCardCommonProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
