import type { InsightType } from "../../../../../../../types";
import type { EndpointBottleneckInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointBottleneckInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointBottleneckInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
