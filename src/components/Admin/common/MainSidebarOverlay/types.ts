import type { GetIssuesPayload } from "../../../../redux/services/types";

export interface MainSidebarQuery {
  query?: GetIssuesPayload;
}

export interface MainSidebarOverlayProps {
  isSidebarOpen: boolean;
  onIssuesPageChange?: (page: number) => void;
  onSidebarClose: () => void;
  mainSidebarQuery?: MainSidebarQuery;
  scopeDisplayName?: string;
}

export interface OverlayProps {
  $transitionDuration: number;
  $transitionClassName: string;
  $isVisible: boolean;
}

export interface MainSidebarContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
