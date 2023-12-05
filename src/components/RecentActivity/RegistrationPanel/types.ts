export interface RegistrationPanelProps {
  onSubmit: (data: RegistrationFormValues) => void;
  onClose: () => void;
  isRegistrationInProgress: boolean;
}

export interface RegistrationFormValues {
  fullName: string;
  email: string;
}
