import type { MouseEvent } from "react";
import type { GetIssuesPayload } from "../../../../../redux/services/types";

export interface IssuesSidebarProps {
  onClose: () => void;
  scopeDisplayName?: string;
  isTransitioning: boolean;
  isResizing?: boolean;
  onResizeHandleMouseDown: (e: MouseEvent) => void;
  query?: GetIssuesPayload;
  isPaginationEnabled?: boolean;
  title?: string;
}

export interface DrawerContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}

export interface ContainerProps {
  $isResizing?: boolean;
}
