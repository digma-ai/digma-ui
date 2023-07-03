import { EndpointSuspectedNPlusOneInsight, Trace } from "../types";

export interface EndpointNPlusOneInsightProps {
  insight: EndpointSuspectedNPlusOneInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  onTraceButtonClick: (trace: Trace) => void;
}
