import { getDurationString } from "../../../../../../../utils/getDurationString";
import type { ScalingIssueCommonProps } from "../types";

export const ScalingDuration = ({ insight }: ScalingIssueCommonProps) => {
  if (!insight) {
    return null;
  }

  return (
    <div>
      Duration range:
      <span>
        {getDurationString(insight.minDuration)} -{" "}
        {getDurationString(insight.maxDuration)}
      </span>
    </div>
  );
};
