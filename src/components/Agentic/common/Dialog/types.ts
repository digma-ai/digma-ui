import type { ReactNode } from "react";

export interface DialogProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}
