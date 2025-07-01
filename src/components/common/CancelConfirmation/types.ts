export interface CancelConfirmationProps {
  header: string;
  description: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onClose: () => void;
  onConfirm: () => void;
}
