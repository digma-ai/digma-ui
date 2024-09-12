import { ReactNode } from "react";

export interface RegistrationCardProps {
  onClose: () => void;
  onComplete: () => void;
  className?: string;
  show?: boolean;
  icon: ReactNode;
  details: ReactNode;
  submitBtnText?: string;
  successLogo: ReactNode;
  scope: string;
}

export interface AnimatedRegistrationCardProps {
  $transitionDuration: number;
  $transitionClassName: string;
}

export interface StyledOverlayProps {
  $isVisible: boolean;
}
