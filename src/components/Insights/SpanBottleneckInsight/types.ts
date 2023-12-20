import { InsightType } from "../../../types";
import { EndpointSlowestSpansInsight, InsightProps } from "../types";

export interface SpanBottleneckInsightProps extends InsightProps {
  insight: EndpointSlowestSpansInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
