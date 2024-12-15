import type { ReactNode } from "react";

export interface IconButtonProps {
  icon: ReactNode;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export interface ButtonProps {
  $isHighlighted?: boolean;
}
