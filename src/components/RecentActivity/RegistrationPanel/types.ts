export interface RegistrationPanelProps {
  onSubmit: (email: string) => void;
  onClose: () => void;
  isRegistrationInProgress: boolean;
}
