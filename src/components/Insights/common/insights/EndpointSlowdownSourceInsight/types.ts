import {
  EndpointSlowdownSourceInsight,
  InsightProps,
  InsightType
} from "../../../types";

export interface EndpointSlowdownSourceInsightProps extends InsightProps {
  insight: EndpointSlowdownSourceInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
