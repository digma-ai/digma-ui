import { Environment } from "../../common/App/types";

export interface EnvironmentBarProps {
  selectedEnvironment?: Environment | null;
  isMenuOpen?: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

export interface EnvironmentBarProps {
  $isMenuOpen?: boolean;
  $isDisabled?: boolean;
}
