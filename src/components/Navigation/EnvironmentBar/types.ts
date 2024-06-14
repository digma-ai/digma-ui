import { Environment } from "../../common/App/types";

export interface EnvironmentBarProps {
  selectedEnvironment?: Environment | null;
  environments: Environment[];
  onEnvironmentChange: (environment: Environment) => void;
}

export interface EnvironmentBarElementProps {
  $isMenuOpen?: boolean;
  $isDisabled?: boolean;
}
