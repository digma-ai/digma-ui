import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { SpanEndpointBottleneckInsight } from "../../../../types";

export interface BottleneckInsightProps extends InsightCardCommonProps {
  insight: SpanEndpointBottleneckInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
