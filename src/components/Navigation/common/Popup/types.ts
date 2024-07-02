import { ReactNode } from "react";

export interface PopupProps {
  children: ReactNode;
  header?: ReactNode;
  height?: string;
  className?: string;
}

export interface ContainerProps {
  $height?: string;
}
