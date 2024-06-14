export interface RegisterFromProps {
  onNext: (isFinished: boolean) => void;
  submitBtnText?: string;
  scope: string;
  className?: string;
}

export interface RegistrationFormValues {
  fullName: string;
  email: string;
}

export interface IconContainerProps {
  $isValid?: boolean;
}
