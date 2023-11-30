export interface RegistrationPanelProps {
  onSubmit: (data: RegistrationFormData) => void;
  onClose: () => void;
  isRegistrationInProgress: boolean;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
}
