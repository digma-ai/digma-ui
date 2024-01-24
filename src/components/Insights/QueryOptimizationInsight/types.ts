import { InsightType } from "../../../types";
import { InsightProps, QueryOptimizationInsight, Trace } from "../types";

export interface QueryOptimizationInsightProps extends InsightProps {
  insight: QueryOptimizationInsight;
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
