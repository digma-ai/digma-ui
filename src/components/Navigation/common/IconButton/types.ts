import React from "react";

export interface IconButtonProps {
  icon: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export interface ButtonProps {
  $isHighlighted?: boolean;
}
