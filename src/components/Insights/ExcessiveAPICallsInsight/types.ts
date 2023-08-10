import { InsightType } from "../../../types";
import { ChattyApiEndpointInsight, InsightProps, Trace } from "../types";

export interface ExcessiveAPICallsInsightProps extends InsightProps {
  insight: ChattyApiEndpointInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace, insightType: InsightType) => void;
}
