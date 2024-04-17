export interface RegistrationProps {
  onSuccessfulRegistration: () => void;
}

export interface RegisterFormValues {
  password: string;
  email: string;
  confirmPassword: string;
}
