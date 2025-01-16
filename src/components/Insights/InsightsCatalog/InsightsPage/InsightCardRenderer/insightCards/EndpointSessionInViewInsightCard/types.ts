import type {
  EndpointSessionInViewInsight,
  InsightType,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointSessionInViewInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointSessionInViewInsight;
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
