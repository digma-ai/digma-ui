import type { MouseEvent, ReactNode } from "react";

export interface SidebarProps {
  onClose: () => void;
  isResizing?: boolean;
  onResizeHandleMouseDown?: (e: MouseEvent) => void;
  isTransitioning?: boolean;
  isResizable?: boolean;
  title?: string;
  content: {
    header?: ReactNode;
    body: ReactNode;
  };
  className?: string;
}

export interface ContainerProps {
  $isResizing?: boolean;
}
