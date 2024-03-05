import {
  EndpointBottleneckInsight,
  InsightProps,
  InsightType,
  Trace
} from "../../../types";

export interface EndpointBottleneckInsightProps extends InsightProps {
  insight: EndpointBottleneckInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
