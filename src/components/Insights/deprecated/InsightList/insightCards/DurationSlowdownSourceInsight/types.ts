import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { EndpointDurationSlowdownInsight } from "../../../../types";

export interface DurationSlowdownSourceInsightProps
  extends InsightCardCommonProps {
  insight: EndpointDurationSlowdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
