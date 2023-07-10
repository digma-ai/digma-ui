import { InsightProps, SpanUsagesInsight, Trace } from "../types";

export interface TopUsageInsightProps extends InsightProps {
  insight: SpanUsagesInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace) => void;
}
