import type { ScalingIssueCommonProps } from "../types";

export const ScalingTestedConcurrency = ({
  insight
}: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  return <div>Tested concurrency: {insight.maxConcurrency}</div>;
};
