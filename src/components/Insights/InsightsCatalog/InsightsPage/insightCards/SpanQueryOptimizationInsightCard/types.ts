import {
  InsightType,
  SpanQueryOptimizationInsight,
  Trace
} from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

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
