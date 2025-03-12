import type { InsightType } from "../../../../../../../types";
import type { EndpointSpanNPlusOneInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointSpanNPlusOneInsightCardProps
  extends InsightCardCommonProps {
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
