import { ReactNode } from "react";

export interface OverlayProps {
  tabIndex?: number;
  children: ReactNode;
  onClose?: () => void;
}
