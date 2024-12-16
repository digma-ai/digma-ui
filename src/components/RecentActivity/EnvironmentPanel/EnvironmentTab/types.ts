import type { KebabMenuButtonProps } from "../../../common/KebabMenuButton/types";
import type { ExtendedEnvironment } from "../../types";

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
  onEnvironmentSetupInstructionsShow: (environmentId: string) => void;
  onEnvironmentDelete: (environmentId: string) => void;
  onEnvironmentClearData: (environmentId: string) => void;
}

export interface ContainerProps {
  $isSelected: boolean;
}

export type LabelProps = ContainerProps;

export type StyledKebabMenuButtonProps = ContainerProps &
  KebabMenuButtonProps & {
    $isMenuOpen: boolean;
  };
