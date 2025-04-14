import { getCriticalityLabel } from "../../../../../../utils/getCriticalityLabel";
import type {
  EndpointScalingInsight,
  SpanScalingInsight
} from "../../../../types";

export const getScalingSummary = (
  insight: SpanScalingInsight | EndpointScalingInsight | null
) => {
  const criticalityString =
    insight && insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(insight.criticality)}`
      : "";
  const summary = ["Scaling Issue", criticalityString]
    .filter(Boolean)
    .join(" - ");

  return summary;
};
