import { ReactNode } from "react";

export interface ListItemProps {
  onClick: () => void;
  className?: string;
  buttons?: ReactNode[];
  name: string;
}
