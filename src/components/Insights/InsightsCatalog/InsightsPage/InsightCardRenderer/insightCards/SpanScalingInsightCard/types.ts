import type {
  InsightType,
  SpanScalingInsight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanScalingInsightCardProps extends InsightCardCommonProps {
  insight: SpanScalingInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
