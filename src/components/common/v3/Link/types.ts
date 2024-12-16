import type { MouseEvent, ReactNode } from "react";

export interface LinkProps {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export interface LinkElementProps {
  $disabled?: boolean;
}
