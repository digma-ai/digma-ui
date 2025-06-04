export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export interface FormProps {
  $height?: number;
}

export interface TextAreaProps {
  $height?: number;
}
