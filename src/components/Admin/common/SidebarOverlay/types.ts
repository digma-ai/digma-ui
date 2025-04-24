import type { ReactNode } from "react";
import type { SidebarProps } from "./Sidebar/types";

export interface SidebarOverlayProps {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
  onSidebarTransitionStart?: () => void;
  onSidebarTransitionEnd?: () => void;
  sidebar: {
    content: SidebarProps["content"];
    isResizable?: SidebarProps["isResizable"];
    className?: string;
    title?: string;
  };
  children?: ReactNode;
}

export interface OverlayProps {
  $transitionDuration: number;
  $transitionClassName: string;
  $isVisible: boolean;
}

export interface SidebarContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
