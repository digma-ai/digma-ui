export interface RegistrationProps {
  onRegister: (email: string) => void;
}

export interface RegisterFormValues {
  password: string;
  email: string;
  confirmPassword: string;
}
