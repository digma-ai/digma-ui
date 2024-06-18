export interface RegistrationCardProps {
  onClose: () => void;
  onComplete: () => void;
  className?: string;
  show?: boolean;
}

export interface AnimatedRegistrationCardProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
