import type { IssuesSidebarQuery } from "../../common/IssuesSidebarOverlay/types";

export interface OverviewProps {
  onGetIssues: (query: IssuesSidebarQuery) => void;
}
