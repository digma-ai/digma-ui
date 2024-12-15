import type { ReactNode } from "react";

type GlowingIconButtonType = "default" | "error";

export interface GlowingIconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  type?: GlowingIconButtonType;
}

export interface BorderContainerProps {
  $type?: GlowingIconButtonType;
}
