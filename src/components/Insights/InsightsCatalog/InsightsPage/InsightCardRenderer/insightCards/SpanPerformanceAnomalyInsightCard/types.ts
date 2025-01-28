import type {
  InsightType,
  SpanPerformanceAnomalyInsight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanPerformanceAnomalyInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanPerformanceAnomalyInsight;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
