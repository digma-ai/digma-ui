import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { SpanDurationBreakdownInsight } from "../../../../types";

export interface DurationBreakdownInsightProps extends InsightCardCommonProps {
  insight: SpanDurationBreakdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
