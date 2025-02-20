import type { GetIssuesPayload } from "../../../../redux/services/types";

export interface IssuesSidebarQuery {
  query?: GetIssuesPayload;
  limit?: number;
  title?: string;
}

export interface IssuesSidebarOverlayProps {
  isSidebarOpen: boolean;
  onIssuesPageChange?: (page: number) => void;
  onSidebarClose: () => void;
  issuesSidebarQuery?: IssuesSidebarQuery;
  scopeDisplayName?: string;
}

export interface OverlayProps {
  $transitionDuration: number;
  $transitionClassName: string;
  $isVisible: boolean;
}

export interface IssuesSidebarContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
