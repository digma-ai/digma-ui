import {
  InsightProps,
  InsightType,
  SpanScalingBadlyInsight,
  Trace
} from "../../../types";

export interface ScalingIssueInsightProps extends InsightProps {
  insight: SpanScalingBadlyInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
