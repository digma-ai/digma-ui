import { EnvironmentIssueCounts } from "../../../common/App/types";
import { ISSUE_CRITICALITY } from "./EnvironmentChip/types";

export const getMostCriticalIssueCount = (
  counts?: EnvironmentIssueCounts
):
  | {
      count: number;
      criticality: ISSUE_CRITICALITY;
    }
  | undefined => {
  if (!counts) {
    return undefined;
  }

  if (counts.highCriticality) {
    return {
      count: counts.highCriticality,
      criticality: ISSUE_CRITICALITY.HIGH
    };
  }

  if (counts.mediumCriticality) {
    return {
      count: counts.mediumCriticality,
      criticality: ISSUE_CRITICALITY.MEDIUM
    };
  }

  if (counts.lowCriticality) {
    return { count: counts.lowCriticality, criticality: ISSUE_CRITICALITY.LOW };
  }

  return undefined;
};
