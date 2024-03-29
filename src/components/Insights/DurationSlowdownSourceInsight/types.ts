import { InsightType } from "../../../types";
import { EndpointDurationSlowdownInsight, InsightProps } from "../types";

export interface DurationSlowdownSourceInsightProps extends InsightProps {
  insight: EndpointDurationSlowdownInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}
