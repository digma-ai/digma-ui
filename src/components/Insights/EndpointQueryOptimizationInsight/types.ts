import { InsightType } from "../../../types";
import {
  EndpointQueryOptimizationInsight,
  InsightProps,
  Trace
} from "../types";

export interface EndpointQueryOptimizationInsightProps extends InsightProps {
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
