import type {
  EndpointBottleneckInsight,
  InsightType,
  Trace
} from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointBottleneckInsightCardProps
  extends InsightCardCommonProps {
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
