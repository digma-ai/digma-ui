import { InsightType } from "../../../types";
import {
  EndpointSuspectedNPlusOneInsight,
  InsightProps,
  Trace
} from "../types";

export interface EndpointNPlusOneInsightProps extends InsightProps {
  insight: EndpointSuspectedNPlusOneInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace, insightType: InsightType) => void;
}
