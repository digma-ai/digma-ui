export interface LoginProps {
  successMessage?: string;
  onLogin: () => void;
}

export interface LoginFormValues {
  password: string;
  email: string;
}
