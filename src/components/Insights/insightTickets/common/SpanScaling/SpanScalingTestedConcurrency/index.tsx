import type { ScalingIssueCommonProps } from "../types";

export const ScalingIssueTestedConcurrency = ({
  insight
}: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  return <div>Tested concurrency: {insight.maxConcurrency}</div>;
};
