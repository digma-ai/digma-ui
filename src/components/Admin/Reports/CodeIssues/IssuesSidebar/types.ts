import type { IssuesReportViewLevel } from "../../../../../redux/slices/issuesReportSlice";

export interface IssuesSidebarProps {
  onClose: () => void;
  environmentId?: string;
  scope?: {
    value: string;
    displayName?: string;
  };
  viewLevel: IssuesReportViewLevel;
  isTransitioning: boolean;
}

export interface DrawerContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
