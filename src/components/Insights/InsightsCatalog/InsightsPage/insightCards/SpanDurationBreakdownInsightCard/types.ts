import { InsightType, SpanDurationBreakdownInsight } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanDurationBreakdownInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanDurationBreakdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
