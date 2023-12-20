import { InsightType } from "../../../types";
import { InsightProps, SessionInViewEndpointInsight, Trace } from "../types";

export interface SessionInViewInsightProps extends InsightProps {
  insight: SessionInViewEndpointInsight;
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
