type GlowingIconButtonType = "default" | "error";

export interface GlowingIconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  type?: GlowingIconButtonType;
}

export interface BorderContainerProps {
  $type?: GlowingIconButtonType;
}
