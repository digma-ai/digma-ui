import { getCriticalityLabel } from "../../../../../../utils/getCriticalityLabel";
import type { SpanScalingInsight } from "../../../../types";
import { ScalingIssueDuration as ScalingIssueDuration_ } from "./SpanScalingDuration";
import { ScalingIssueAffectedEndpoints as ScalingIssueAffectedEndpoints_ } from "./SpanScalingEndpoints";
import { ScalingIssueMessage as ScalingIssueMessage_ } from "./SpanScalingMessage";
import { ScalingIssueRootCauses as ScalingIssueRootCauses_ } from "./SpanScalingRootCauses";
import { ScalingIssueTestedConcurrency as ScalingIssueTestedConcurrency_ } from "./SpanScalingTestedConcurrency";

export const getScalingIssueSummary = (insight: SpanScalingInsight | null) => {
  const criticalityString =
    insight && insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(insight.criticality)}`
      : "";
  const summary = ["Scaling Issue", criticalityString]
    .filter(Boolean)
    .join(" - ");

  return summary;
};

export const ScalingIssueMessage = ScalingIssueMessage_;

export const ScalingIssueTestedConcurrency = ScalingIssueTestedConcurrency_;

export const ScalingIssueAffectedEndpoints = ScalingIssueAffectedEndpoints_;

export const ScalingIssueRootCauses = ScalingIssueRootCauses_;

export const ScalingIssueDuration = ScalingIssueDuration_;
