import {
  InsightProps,
  InsightType,
  SpanEndpointBottleneckInsight
} from "../../../types";

export interface SpanEndpointBottleneckEndpointsProps extends InsightProps {
  insight: SpanEndpointBottleneckInsight;

  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
