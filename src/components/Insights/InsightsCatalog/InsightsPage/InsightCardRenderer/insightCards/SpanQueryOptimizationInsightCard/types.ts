import type {
  InsightType,
  SpanQueryOptimizationInsight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanQueryOptimizationInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanQueryOptimizationInsight;
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
