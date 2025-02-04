import type { ReactNode } from "react";
import type { Severity } from "../../IssuesReport/Table/types";

export interface TileProps {
  title: string;
  children?: ReactNode;
  severity?: Severity;
  tooltip?: ReactNode;
  onTitleClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export interface TileContainerProps {
  $severity?: Severity;
  $isActive?: boolean;
}

export interface ContentContainerProps {
  $isActive?: boolean;
}

export interface TitleProps {
  $isVisible?: boolean;
}

export interface ChildrenContainerProps {
  $isVisible?: boolean;
}
