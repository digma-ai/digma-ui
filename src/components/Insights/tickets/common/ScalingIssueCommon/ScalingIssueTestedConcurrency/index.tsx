import { ScalingIssueCommonProps } from "../types";

export const ScalingIssueTestedConcurrency = (
  props: ScalingIssueCommonProps
) => {
  if (!props.insight) {
    return null;
  }

  return (
    <div key={"testedConcurrency"}>
      Tested concurrency: {props.insight.maxConcurrency}
    </div>
  );
};
