import type {
  InsightType,
  SpanEndpointBottleneckInsight,
  Trace
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanEndpointBottleneckInsightCardProps
  extends InsightCardCommonProps {
  insight: SpanEndpointBottleneckInsight;
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
