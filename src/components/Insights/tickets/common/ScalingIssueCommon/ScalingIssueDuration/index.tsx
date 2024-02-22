import { ScalingIssueCommonProps } from "../types";
import { getDurationString } from "../../../../../../utils/getDurationString";

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
