export interface CancelConfirmationProps {
  header: string;
  description: string;
  cancelBtnText?: string;
  onClose: () => void;
  onConfirm: () => void;
}
