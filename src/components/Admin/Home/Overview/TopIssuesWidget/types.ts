import type { IssuesSidebarQuery } from "../../../common/IssuesSidebarOverlay/types";

export interface TopIssuesWidgetProps {
  onGetIssues: (query: IssuesSidebarQuery) => void;
}
