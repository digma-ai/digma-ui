import type {
  EndpointHighNumberOfQueriesInsight,
  InsightType,
  Trace
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointHighNumberOfQueriesInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointHighNumberOfQueriesInsight;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
