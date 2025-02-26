import type { Environment } from "../../../common/App/types";

export interface EnvironmentMenuProps {
  selectedEnvironment?: Environment | null;
  environments: Environment[];
  onMenuItemClick: (environment: Environment) => void;
}
