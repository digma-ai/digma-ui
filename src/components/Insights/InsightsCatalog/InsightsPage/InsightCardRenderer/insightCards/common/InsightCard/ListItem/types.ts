import type { ReactNode } from "react";

export interface ListItemProps {
  onClick: () => void;
  className?: string;
  endContent?: ReactNode | ReactNode[];
  name: string;
}
