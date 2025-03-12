import type { InsightType } from "../../../../../../../types";
import type {
  EndpointQueryOptimizationV2Insight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointQueryOptimizationV2InsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointQueryOptimizationV2Insight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
}
