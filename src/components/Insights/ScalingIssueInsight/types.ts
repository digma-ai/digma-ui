import { InsightType } from "../../../types";
import { InsightProps, SpanScalingBadlyInsight, Trace } from "../types";

export interface ScalingIssueInsightProps extends InsightProps {
  insight: SpanScalingBadlyInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace, insightType: InsightType) => void;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType
  ) => void;
}
