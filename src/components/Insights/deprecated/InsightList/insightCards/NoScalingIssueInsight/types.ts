import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { SpanScalingWellInsight } from "../../../../types";

export interface NoScalingIssueInsightProps extends InsightCardCommonProps {
  insight: SpanScalingWellInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
