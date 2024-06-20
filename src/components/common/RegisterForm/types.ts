export interface RegisterFromProps {
  onNext: (isFinished: boolean) => void;
  submitBtnText?: string;
  scope: string;
  className?: string;
  alwaysRenderError?: boolean;
  emailPlaceholder?: string;
  fullNamePlaceholder?: string;
}

export interface RegistrationFormValues {
  fullName: string;
  email: string;
}

export interface IconContainerProps {
  $isValid?: boolean;
}
