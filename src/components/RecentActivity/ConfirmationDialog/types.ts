import type { ReactNode } from "react";

export interface ConfirmationDialogProps {
  title: string;
  content?: ReactNode;
  confirmButtonText?: string;
  trackingPrefix?: string;
  onConfirm: () => void;
  onCancel: () => void;
  trackingData?: Record<string, unknown>;
}
