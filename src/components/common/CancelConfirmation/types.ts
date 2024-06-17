export interface DeleteEnvironmentConfirmationProps {
  header: string;
  description: string;
  cancelBtnText?: string;
  onClose: () => void;
  onCancel: () => void;
}
