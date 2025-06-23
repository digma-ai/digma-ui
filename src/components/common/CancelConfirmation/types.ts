export interface CancelConfirmationProps {
  header: string;
  description: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  onClose: () => void;
  onConfirm: () => void;
}
