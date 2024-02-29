import {
  InsightProps,
  InsightType,
  SpanEndpointBottleneckInsight
} from "../../../types";

export interface SpanEndpointBottleneckInsightProps extends InsightProps {
  insight: SpanEndpointBottleneckInsight;

  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
