import {
  EndpointSpanNPlusOneInsight,
  InsightProps,
  InsightType,
  Trace
} from "../../../types";

export interface EndpointNPlusOneInsightProps extends InsightProps {
  insight: EndpointSpanNPlusOneInsight;
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
