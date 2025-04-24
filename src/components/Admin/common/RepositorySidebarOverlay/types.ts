import type { GetIssuesPayload } from "../../../../redux/services/types";

export interface RepositorySidebarQuery {
  query?: GetIssuesPayload;
}

export interface RepositorySidebarOverlayProps {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
  sidebarQuery?: RepositorySidebarQuery;
  scopeDisplayName?: string;
}

export interface TabLocation {
  id: string;
  path?: string;
}

export interface RepositorySidebarHistoryState {
  spanCodeObjectId?: string;
  tabLocation?: TabLocation;
}
