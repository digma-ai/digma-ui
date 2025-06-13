export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  fontSize?: number; // in pixels
}

export interface FormProps {
  $height?: number;
}

export interface TextAreaProps {
  $height?: number;
  $fontSize?: number;
}
