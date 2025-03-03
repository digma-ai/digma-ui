import type {
  InsightType,
  SpanPerformanceAnomalyInsight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanPerformanceAnomalyInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanPerformanceAnomalyInsight;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
}
