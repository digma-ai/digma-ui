import type {
  Environment,
  EnvironmentIssueCounts
} from "../../../../../redux/services/types";

export enum IssueCriticality {
  Low,
  Medium,
  High
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
  $criticality: IssueCriticality;
}
