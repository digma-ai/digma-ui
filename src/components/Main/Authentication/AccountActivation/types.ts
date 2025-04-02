export interface AccountActivationProps {
  emailToConfirm?: string;
  onConfirmationEmailResend: (email: string) => void;
  onClose: () => void;
}
