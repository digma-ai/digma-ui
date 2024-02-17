import { Environment } from "../../common/App/types";

export interface EnvironmentMenuProps {
  selectedEnvironment?: Environment;
  environments: Environment[];
  onEnvironmentChange: (environment: Environment) => void;
  isDisabled?: boolean;
}

export interface EnvironmentBarProps {
  $isActive?: boolean;
  $isMenuOpen?: boolean;
  $isDisabled?: boolean;
}
