import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import { ScalingIssueCommonProps } from "./types";
import { getDurationString } from "../../../../../utils/getDurationString";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { SpanScalingBadlyInsight } from "../../../types";
import { ConfigContextData } from "../../../../common/App/types";

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

export const ScalingIssueMessage = (props: ScalingIssueCommonProps) => {
  if (!props.insight) {
    return null;
  }

  return (
    <div key={"message"}>{props.insight.shortDisplayInfo.description}</div>
  );
};

export const ScalingIssueTestedConcurrency = (
  props: ScalingIssueCommonProps
) => {
  if (!props.insight) {
    return null;
  }

  return (
    <div key={"testedConcurrency"}>
      Tested concurrency: {props.insight.maxConcurrency}
    </div>
  );
};

export const ScalingIssueAffectedEndpoints = (
  props: ScalingIssueCommonProps
) => {
  if (!props.insight) {
    return null;
  }

  const endpoints = props.insight.affectedEndpoints;

  if (endpoints.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Affected endpoints:</div>
      <s.List>
        {endpoints.map((x) => (
          <li key={x.route}>
            <div>
              {x.serviceName} {trimEndpointScheme(x.route)}
            </div>
          </li>
        ))}
      </s.List>
    </div>
  );
};

export const ScalingIssueRootCauses = (props: ScalingIssueCommonProps) => {
  if (!props.insight) {
    return null;
  }

  const rootCauses = props.insight.rootCauseSpans;

  if (rootCauses.length === 0) {
    return null;
  }

  return (
    <div>
      <div>Root causes:</div>
      <s.List>
        {rootCauses.map((x) => (
          <li key={x.spanCodeObjectId}>{x.displayName}</li>
        ))}
      </s.List>
    </div>
  );
};

export const ScalingIssueDuration = (props: ScalingIssueCommonProps) => {
  if (!props.insight) {
    return null;
  }

  return (
    <div key={"durationRange"}>
      Duration range:
      <span>
        {getDurationString(props.insight.minDuration)} -{" "}
        {getDurationString(props.insight.maxDuration)}
      </span>
    </div>
  );
};
