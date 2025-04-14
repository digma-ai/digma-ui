import type {
  EndpointScalingInsight,
  SpanScalingInsight
} from "../../../../types";

export interface ScalingIssueCommonProps {
  insight: SpanScalingInsight | EndpointScalingInsight | null;
}
