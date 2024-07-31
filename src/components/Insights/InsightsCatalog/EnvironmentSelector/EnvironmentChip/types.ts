import { Environment } from "../../../../common/App/types";

export interface EnvironmentChipProps {
  environment: Environment;
  onClick: (environment: string) => void;
  isActive: boolean;
}

export interface StyledChipProps {
  isActive: boolean;
}
