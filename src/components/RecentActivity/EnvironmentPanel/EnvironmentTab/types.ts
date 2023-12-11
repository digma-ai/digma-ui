import { ExtendedEnvironment } from "../../types";

export interface TabThemeColors {
  text: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  background: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  borderBottom: {
    hover: string;
    focus: string;
  };
}

export interface EnvironmentTabProps {
  environment: ExtendedEnvironment;
  isSelected: boolean;
  onClick: (environment: ExtendedEnvironment) => void;
  onEnvironmentDelete: (environment: string) => void;
}

export interface ContainerProps {
  $isSelected: boolean;
  $isPending?: boolean;
}
