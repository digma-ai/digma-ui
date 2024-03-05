import {
  InsightProps,
  InsightType,
  SpanEndpointBottleneckInsight,
  Trace
} from "../../../types";

export interface SpanEndpointBottleneckInsightProps extends InsightProps {
  insight: SpanEndpointBottleneckInsight;
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
