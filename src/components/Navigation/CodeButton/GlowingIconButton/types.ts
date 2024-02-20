type GlowingIconButtonType = "default" | "error";

export interface GlowingIconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  type?: GlowingIconButtonType;
}

export interface BorderContainerProps {
  $type?: GlowingIconButtonType;
}
