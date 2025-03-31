import type { MouseEvent } from "react";
import type { GetIssuesPayload } from "../../../../../redux/services/types";

export interface MainSidebarProps {
  onClose: () => void;
  scopeDisplayName?: string;
  isTransitioning: boolean;
  isResizing?: boolean;
  onResizeHandleMouseDown: (e: MouseEvent) => void;
  query?: GetIssuesPayload;
}

export interface DrawerContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}

export interface ContainerProps {
  $isResizing?: boolean;
}

export interface MainSidebarHistoryState {
  spanCodeObjectId?: string;
  tabId: string;
}
