import { ReactNode } from "react";
import { GenericCodeObjectInsight } from "../../../../../types";

export interface IssueSimplifiedCardProps {
  insight: GenericCodeObjectInsight;
  isCritical?: boolean;
  metric?: ReactNode;
  onGoToSpan: () => void;
  onRecheck: () => void;
  onGoToTrace?: () => void;
  onDismiss?: () => void;
  onShow?: () => void;
  onJiraButtonClick?: () => void;
  onRead?: () => void;
}

export interface ContainerProps {
  $isRead?: boolean;
  $isCritical?: boolean;
}
