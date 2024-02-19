import { IconButtonProps } from "../common/IconButton/types";

export interface ExtendedIconButtonProps extends IconButtonProps {
  isActive: boolean;
}

export interface CodeButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
  hasObservability: boolean;
  hasData: boolean;
  isAlreadyAtScope: boolean;
}

export interface OutlineProps {
  $isAnimated: boolean;
}
