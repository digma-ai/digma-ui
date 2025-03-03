import type {
  EndpointSlowdownSourceInsight,
  InsightType
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointSlowdownSourceInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointSlowdownSourceInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
}
