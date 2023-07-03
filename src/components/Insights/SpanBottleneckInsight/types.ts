import { EndpointSlowestSpansInsight } from "../types";

export interface SpanBottleneckInsightProps {
  insight: EndpointSlowestSpansInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
}
