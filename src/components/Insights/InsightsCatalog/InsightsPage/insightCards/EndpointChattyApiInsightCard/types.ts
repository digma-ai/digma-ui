import {
  EndpointChattyApiInsight,
  InsightType,
  Trace
} from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointChattyApiInsightCardProps
  extends InsightCardCommonProps {
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
