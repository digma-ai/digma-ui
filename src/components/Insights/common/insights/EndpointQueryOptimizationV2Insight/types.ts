import {
  EndpointQueryOptimizationV2Insight,
  InsightProps,
  InsightType,
  Trace
} from "../../../types";

export interface EndpointQueryOptimizationV2InsightProps extends InsightProps {
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
