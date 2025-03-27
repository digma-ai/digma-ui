import type {
  Environment,
  EnvironmentIssueCounts
} from "../../../../redux/services/types";

export interface SelectorEnvironment {
  environment: Environment;
  issueCounts?: EnvironmentIssueCounts;
}

export interface EnvironmentSelectorProps {
  environments: SelectorEnvironment[];
}
