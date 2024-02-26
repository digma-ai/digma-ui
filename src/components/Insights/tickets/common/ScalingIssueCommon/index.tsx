import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { SpanScalingBadlyInsight } from "../../../types";
import { ConfigContextData } from "../../../../common/App/types";
import { ScalingIssueAffectedEndpoints as ScalingIssueAffectedEndpoints_ } from "./ScalingIssueAffectedEndpoints";
import { ScalingIssueRootCauses as ScalingIssueRootCauses_ } from "./ScalingIssueRootCauses";
import { ScalingIssueDuration as ScalingIssueDuration_ } from "./ScalingIssueDuration";
import { ScalingIssueTestedConcurrency as ScalingIssueTestedConcurrency_ } from "./ScalingIssueTestedConcurrency";
import { ScalingIssueMessage as ScalingIssueMessage_ } from "./ScalingIssueMessage";

export const getHistogramAttachment = (
  config: ConfigContextData,
  insight: SpanScalingBadlyInsight | null
) => {
  if (!insight) {
    return undefined;
  }

  const histogramUrlParams = new URLSearchParams({
    env: insight.environment,
    scoid: insight.spanInfo?.spanCodeObjectId || ""
  });

  return {
    url: `${
      config.digmaApiUrl
    }/Graphs/graphForSpanScaling?${histogramUrlParams.toString()}`,
    fileName: `histogram.html`
  };
};

export const getTraceAttachment = (
  config: ConfigContextData,
  traceId: string | null | undefined
) => {
  if (!traceId) {
    return undefined;
  }

  return {
    url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
    fileName: `trace-${traceId}.json`
  };
};

export const getScalingIssueSummary = (
  insight: SpanScalingBadlyInsight | null
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

export const ScalingIssueMessage = ScalingIssueMessage_;

export const ScalingIssueTestedConcurrency = ScalingIssueTestedConcurrency_;

export const ScalingIssueAffectedEndpoints = ScalingIssueAffectedEndpoints_;

export const ScalingIssueRootCauses = ScalingIssueRootCauses_;

export const ScalingIssueDuration = ScalingIssueDuration_;
