import * as s from "../styles";
import type { ScalingIssueCommonProps } from "../types";

export const ScalingIssueRootCauses = ({
  insight
}: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  const rootCauses = insight.rootCauseSpans;

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
