import { InsightProps, SpanDurationBreakdownInsight } from "../types";

export interface DurationBreakdownInsightProps extends InsightProps {
  insight: SpanDurationBreakdownInsight;

  onAssetLinkClick: (spanCodeObjectId: string) => void;
}
