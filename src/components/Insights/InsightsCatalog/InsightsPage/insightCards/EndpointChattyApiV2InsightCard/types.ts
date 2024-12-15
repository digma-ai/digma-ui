import type {
  EndpointChattyApiV2Insight,
  InsightType,
  Trace
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

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
