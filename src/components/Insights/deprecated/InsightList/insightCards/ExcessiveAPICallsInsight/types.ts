import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { EndpointChattyApiInsight, Trace } from "../../../../types";

export interface ExcessiveAPICallsInsightProps extends InsightCardCommonProps {
  insight: EndpointChattyApiInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
}
