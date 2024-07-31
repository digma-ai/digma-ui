import { HTMLAttributes, ReactNode } from "react";

export interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
