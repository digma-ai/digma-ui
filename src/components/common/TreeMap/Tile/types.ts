import { ReactNode } from "react";
import { Severity } from "../../../Dashboard/NewReport/MetricsTable/types";

export interface TileProps {
  title: string;
  children?: ReactNode;
  severity?: Severity;
  tooltip?: ReactNode;
  onTitleClick?: () => void;
}

export interface TileContainerProps {
  $severity?: Severity;
}

export interface TitleProps {
  $isVisible?: boolean;
}

export interface ChildrenContainerProps {
  $isVisible?: boolean;
}
