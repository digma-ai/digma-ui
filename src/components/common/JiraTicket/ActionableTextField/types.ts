import type { ChangeEventHandler, ReactElement } from "react";

export interface TextFieldProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string | null;
  buttons: ReactElement;
  value: string | null;
  label: string;
  disabled: boolean;
  errorMessage?: string | null;
}
