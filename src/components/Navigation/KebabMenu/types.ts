import { ReactNode } from "react";

export interface KebabMenuProps {
  onClose: () => void;
}

export interface MenuItem {
  id: string;
  icon?: ReactNode;
  label: string;
  onClick: () => void;
}
