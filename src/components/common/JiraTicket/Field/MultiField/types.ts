import { ReactNode } from "react";

export interface MultiFieldProps {
  label: string;
  contents?: ContentProps[];
  errorMessage?: string;
  selectable?: boolean;
}

export interface ContentProps {
  content: ReactNode;
  button: ReactNode;
  multiline?: boolean;
}
