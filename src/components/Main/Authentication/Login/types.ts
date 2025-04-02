export interface LoginProps {
  onConfirmationEmailResend: (email: string) => void;
  successMessage?: string;
  onLogin: () => void;
}

export interface LoginFormValues {
  password: string;
  email: string;
}
