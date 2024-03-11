import { ReactNode } from "react";

export interface SingleFieldProps {
  content: ReactNode;
  label?: string;
  button: ReactNode;
  multiline?: boolean;
  errorMessage?: string;
  selectable?: boolean;
}
