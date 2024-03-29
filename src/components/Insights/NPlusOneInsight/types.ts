import { InsightType } from "../../../types";
import { InsightProps, SpanNPlusOneInsight, Trace } from "../types";

export interface NPlusOneInsightProps extends InsightProps {
  insight: SpanNPlusOneInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
