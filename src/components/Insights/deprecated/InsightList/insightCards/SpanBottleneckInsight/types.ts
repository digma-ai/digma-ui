import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { EndpointSlowestSpansInsight } from "../../../../types";

export interface SpanBottleneckInsightProps extends InsightCardCommonProps {
  insight: EndpointSlowestSpansInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
