import { InsightType } from "../../../types";
import { InsightProps, SpanNPlusOneInsight, Trace } from "../types";

export interface NPlusOneInsightProps extends InsightProps {
  insight: SpanNPlusOneInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace, insightType: InsightType) => void;
}
