import type { InsightType } from "../../../../../../../types";
import type { EndpointChattyApiV2Insight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointChattyApiV2InsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointChattyApiV2Insight;
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
