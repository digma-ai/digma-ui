import {
  EndpointHighNumberOfQueriesInsight,
  InsightProps,
  InsightType,
  Trace
} from "../../../types";

export interface HighNumberOfQueriesInsightProps extends InsightProps {
  insight: EndpointHighNumberOfQueriesInsight;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
