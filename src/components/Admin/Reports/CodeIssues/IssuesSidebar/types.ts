import type { IssuesReportViewLevel } from "../../../../../redux/slices/issuesReportSlice";

export interface IssuesHeaderProps {
  onClose: () => void;
  environmentId?: string;
  scope?: {
    value: string;
    displayName?: string;
  };
  viewLevel: IssuesReportViewLevel;
}

export interface DrawerContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
