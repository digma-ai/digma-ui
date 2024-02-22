import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import * as s from "./styles";
import { ScalingIssueCommonProps } from "./types";
import { getDurationString } from "../../../../../utils/getDurationString";

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
