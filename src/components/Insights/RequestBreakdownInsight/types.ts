import { InsightType } from "../../../types";
import { EndpointBreakdownInsight } from "../types";

export interface RequestBreakdownInsightProps {
  insight: EndpointBreakdownInsight;
  onRecalculate: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
