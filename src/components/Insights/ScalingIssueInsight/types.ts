import { InsightType } from "../../../types";
import { SpanScalingBadlyInsight, Trace } from "../types";

export interface ScalingIssueInsightProps {
  insight: SpanScalingBadlyInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
