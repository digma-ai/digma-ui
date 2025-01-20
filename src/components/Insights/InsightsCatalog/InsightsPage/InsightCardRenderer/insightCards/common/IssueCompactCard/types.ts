import type { ReactNode } from "react";
import type { GenericCodeObjectInsight } from "../../../../../../types";

export interface IssueCompactCardProps {
  insight: GenericCodeObjectInsight;
  isCritical?: boolean;
  metric?: ReactNode;
  onGoToSpan: () => void;
  onRecheck: () => void;
  onGoToTrace?: () => void;
  onDismiss: () => void;
  onShow: () => void;
  onMarkAsRead: () => void;
  onTicketOpen: () => void;
}

export interface ContainerProps {
  $isRead?: boolean;
  $isCritical?: boolean;
}
