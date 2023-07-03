import { InsightType } from "../../../types";
import { SpanUsagesInsight, Trace } from "../types";

export interface TopUsageInsightProps {
  insight: SpanUsagesInsight;
  onRecalculate: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace) => void;
}
