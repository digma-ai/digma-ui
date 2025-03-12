import type { InsightType } from "../../../../../../../types";
import type {
  EndpointHighNumberOfQueriesInsight,
  Trace
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointHighNumberOfQueriesInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointHighNumberOfQueriesInsight;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
