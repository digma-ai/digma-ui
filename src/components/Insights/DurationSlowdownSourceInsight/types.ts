import { EndpointDurationSlowdownInsight } from "../types";

export interface DurationSlowdownSourceInsightProps {
  insight: EndpointDurationSlowdownInsight;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
}
