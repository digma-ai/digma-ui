import { SpanNPlusOneInsight, Trace } from "../types";

export interface NPlusOneInsightProps {
  insight: SpanNPlusOneInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace) => void;
}
