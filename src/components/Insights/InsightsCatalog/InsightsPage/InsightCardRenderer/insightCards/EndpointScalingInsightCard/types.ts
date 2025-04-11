import type { InsightType } from "../../../../../../../types";
import type { EndpointScalingInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointScalingInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointScalingInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
}
