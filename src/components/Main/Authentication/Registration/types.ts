export interface RegistrationProps {
  onRegister: () => void;
}

export interface RegisterFormValues {
  password: string;
  email: string;
  confirmPassword: string;
}
