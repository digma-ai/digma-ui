import { ReactNode } from "react";

export interface ContainersProps {
  $expanded: boolean;
}

export interface PromotionCardProps {
  onDiscard: () => void;
  onAccept: () => void;
  acceptBtnText: string;
  children: ReactNode;
  title: ReactNode;
  background: ReactNode;
  collapsedBackground: ReactNode;
}
