import { DigmathonProgressData } from "../../types";

export interface ProgressViewProps {
  data: DigmathonProgressData;
}
export interface FoundIssuesNumberProps {
  $isNew: boolean;
}

export interface NewIssuesFoundMessageProps {
  $transitionClassName: string;
  $transitionDuration: number;
}

export interface UpdateProgressButtonProps {
  $isShining: boolean;
}
