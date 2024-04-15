export interface RegisterStepProps {
  onNext: (isFinished: boolean) => void;
}

export interface RegistrationFormValues {
  fullName: string;
  email: string;
}

export interface IconContainerProps {
  $isValid?: boolean;
}
