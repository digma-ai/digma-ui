import { Environment } from "../../common/App/types";

export interface EnvironmentBarProps {
  selectedEnvironment?: Environment;
  isMenuOpen?: boolean;
  onClick: () => void;
}

export interface EnvironmentBarProps {
  $isMenuOpen?: boolean;
  $isDisabled?: boolean;
}
