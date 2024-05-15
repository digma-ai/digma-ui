import { ReactNode } from "react";

export interface FadingContentSwitchProps {
  switchFlag: boolean;
  children: ReactNode[];
  className?: string;
}

export interface FadingContainerProps {
  $transitionClassName: string;
  $transitionDuration: number;
}
