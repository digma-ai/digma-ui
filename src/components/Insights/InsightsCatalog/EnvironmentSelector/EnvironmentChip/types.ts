import {
  Environment,
  EnvironmentIssueCounts
} from "../../../../common/App/types";

export enum ISSUE_CRITICALITY {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

export interface EnvironmentChipProps {
  environment: Environment;
  onClick: (environment: string) => void;
  isActive: boolean;
  issueCounts?: EnvironmentIssueCounts;
}

export interface StyledChipProps {
  $isActive: boolean;
}

export interface CounterProps {
  $criticality: ISSUE_CRITICALITY;
}
