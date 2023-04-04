import { ReactNode } from "react";

export interface ButtonProps {
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
  buttonType?: "primary" | "secondary";
  className?: string;
}
