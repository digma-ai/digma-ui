import {
  EndpointChattyApiV2Insight,
  InsightProps,
  InsightType,
  Trace
} from "../../../types";

export interface EndpointChattyApiV2InsightProps extends InsightProps {
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
