import type { Environment } from "../../../redux/services/types";

export interface EnvironmentBarProps {
  selectedEnvironment?: Environment | null;
  environments: Environment[];
  onEnvironmentChange: (environment: Environment) => void;
}

export interface EnvironmentBarElementProps {
  $isDisabled?: boolean;
}
