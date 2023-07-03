import { InsightType } from "../../../types";
import { SpanDurationBreakdownInsight } from "../types";

export interface DurationBreakdownInsightProps {
  insight: SpanDurationBreakdownInsight;
  onRecalculate: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
}
