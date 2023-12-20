import { InsightType } from "../../../types";
import { InsightProps, SpanEndpointBottleneckInsight } from "../types";

export interface BottleneckInsightProps extends InsightProps {
  insight: SpanEndpointBottleneckInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
