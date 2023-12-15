import { ReactNode } from "react";

export interface FieldThemeColors {
  border: string;
  icon: string;
  text: string;
}

export type ButtonPosition = "top" | "center";

export interface FieldProps {
  content: ReactNode;
  label: string;
  button: ReactNode;
  multiline?: boolean;
  errorMessage?: string;
}

export interface ButtonContainerProps {
  $position: ButtonPosition;
  $scrollbarOffset: number;
}

export interface ContentProps {
  $multiline?: boolean;
}
