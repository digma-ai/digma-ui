import { ReactNode } from "react";

export interface FadingContentSwitchProps {
  switchFlag: boolean;
  children: ReactNode[];
  className?: string;
}

export interface FadingContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
