import { ScalingIssueCommonProps } from "../types";

export const ScalingIssueMessage = ({ insight }: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  return <div>{insight.shortDisplayInfo.description}</div>;
};
