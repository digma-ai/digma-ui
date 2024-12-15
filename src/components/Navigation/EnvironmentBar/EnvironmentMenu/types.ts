import type { Environment } from "../../../common/App/types";

export interface EnvironmentMenuProps {
  environments: Environment[];
  onMenuItemClick: (environment: Environment) => void;
}
