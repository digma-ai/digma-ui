import type { ScalingIssueCommonProps } from "../types";

export const ScalingMessage = ({ insight }: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  return <div>{insight.shortDisplayInfo.description}</div>;
};
