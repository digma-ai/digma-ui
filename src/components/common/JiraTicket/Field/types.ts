import { ReactNode } from "react";

export interface FieldThemeColors {
  border: string;
  icon: string;
  text: string;
}

export type ButtonPosition = "top" | "center";

export interface FieldProps {
  children: ReactNode;
  button: ReactNode;
  multiline?: boolean;
}

export interface ButtonContainerProps {
  $position: ButtonPosition;
  $scrollbarOffset: number;
}

export interface ContentProps {
  $multiline?: boolean;
}
