import {
  EndpointSpanNPlusOneInsight,
  InsightType,
  Trace
} from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

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
