import type {
  EndpointSlowdownSourceInsight,
  InsightType
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointSlowdownSourceInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointSlowdownSourceInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
