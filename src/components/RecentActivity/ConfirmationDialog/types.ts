export interface ConfirmationDialogProps {
  title: string;
  message?: string;
  confirmButtonText?: string;
  trackingPrefix?: string;
  onConfirm: () => void;
  onCancel: () => void;
  trackingData?: Record<string, any>;
}
