import React from "react";

export interface IconButtonProps {
  icon: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
