import { ScalingIssueCommonProps } from "../types";

export const ScalingIssueMessage = (props: ScalingIssueCommonProps) => {
  if (!props.insight) {
    return null;
  }

  return (
    <div key={"message"}>{props.insight.shortDisplayInfo.description}</div>
  );
};
