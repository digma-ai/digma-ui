import {
  InsightProps,
  InsightType,
  SessionInViewEndpointInsight,
  Trace
} from "../../../types";

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
