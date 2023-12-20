import { InsightType } from "../../../types";
import {
  EndpointSuspectedNPlusOneInsight,
  InsightProps,
  Trace
} from "../types";

export interface EndpointNPlusOneInsightProps extends InsightProps {
  insight: EndpointSuspectedNPlusOneInsight;
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
