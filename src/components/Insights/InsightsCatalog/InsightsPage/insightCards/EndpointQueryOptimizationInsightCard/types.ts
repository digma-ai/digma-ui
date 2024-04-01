import {
  EndpointQueryOptimizationInsight,
  InsightType,
  Trace
} from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointQueryOptimizationInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointQueryOptimizationInsight;
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
