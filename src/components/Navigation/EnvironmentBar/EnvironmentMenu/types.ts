import type { Environment } from "../../../../redux/services/types";

export interface EnvironmentMenuProps {
  selectedEnvironment?: Environment | null;
  environments: Environment[];
  onMenuItemClick: (environment: Environment) => void;
}
