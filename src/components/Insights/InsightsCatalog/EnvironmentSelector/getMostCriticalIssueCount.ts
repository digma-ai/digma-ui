import type { EnvironmentIssueCounts } from "../../../../redux/services/types";
import { IssueCriticality } from "./EnvironmentChip/types";

export const getMostCriticalIssueCount = (
  counts?: EnvironmentIssueCounts
):
  | {
      count: number;
      criticality: IssueCriticality;
    }
  | undefined => {
  if (!counts) {
    return undefined;
  }

  if (counts.highCriticality) {
    return {
      count: counts.highCriticality,
      criticality: IssueCriticality.High
    };
  }

  if (counts.mediumCriticality) {
    return {
      count: counts.mediumCriticality,
      criticality: IssueCriticality.Medium
    };
  }

  if (counts.lowCriticality) {
    return { count: counts.lowCriticality, criticality: IssueCriticality.Low };
  }

  return undefined;
};
