import { InsightType } from "../../../types";
import { InsightProps, SpanDurationBreakdownInsight } from "../types";

export interface DurationBreakdownInsightProps extends InsightProps {
  insight: SpanDurationBreakdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
