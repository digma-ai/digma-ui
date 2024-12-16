import type { ReactNode } from "react";

export interface OverlayProps {
  tabIndex?: number;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}
