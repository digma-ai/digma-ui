import type {
  EndpointQueryOptimizationV2Insight,
  InsightType,
  Trace
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

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
