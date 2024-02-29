import { InsightType, SpanEndpointBottleneckInsight } from "../../../types";

export interface SpanEndpointBottleneckEndpointsProps {
  insight: SpanEndpointBottleneckInsight;

  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
