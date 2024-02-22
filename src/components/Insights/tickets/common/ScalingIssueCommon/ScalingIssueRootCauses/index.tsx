import * as s from "../styles";
import { ScalingIssueCommonProps } from "../types";

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
