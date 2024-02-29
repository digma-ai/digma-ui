import {
  EndpointBottleneckInsight,
  InsightProps,
  InsightType
} from "../../../types";

export interface EndpointBottleneckInsightProps extends InsightProps {
  insight: EndpointBottleneckInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
