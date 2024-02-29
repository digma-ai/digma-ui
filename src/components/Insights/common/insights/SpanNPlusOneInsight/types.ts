import {
  InsightProps,
  InsightType,
  SpanNPlusOneInsight,
  Trace
} from "../../../types";

export interface SpanNPlusOneInsightProps extends InsightProps {
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
