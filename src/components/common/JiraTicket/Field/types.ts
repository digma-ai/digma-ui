import { ReactNode } from "react";

export interface FieldThemeColors {
  border: string;
  icon: string;
  text: string;
}

export type ButtonPosition = "top" | "center";

export interface SingleFieldProps {
  content: ReactNode;
  label?: string;
  button: ReactNode;
  multiline?: boolean;
  errorMessage?: string;
  selectable?: boolean;
}

export interface ButtonContainerProps {
  $position: ButtonPosition;
  $scrollbarOffset: number;
}

export interface ContentProps {
  $multiline?: boolean;
}

export interface ContainerProps {
  $selectable?: boolean;
}
