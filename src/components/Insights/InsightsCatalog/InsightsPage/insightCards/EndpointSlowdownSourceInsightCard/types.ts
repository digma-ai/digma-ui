import { EndpointSlowdownSourceInsight, InsightType } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointSlowdownSourceInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointSlowdownSourceInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
