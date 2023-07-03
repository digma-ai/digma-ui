import { SpanEndpointBottleneckInsight } from "../types";

export interface BottleneckInsightProps {
  insight: SpanEndpointBottleneckInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
}
