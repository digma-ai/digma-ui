export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export interface FormProps {
  $height?: number;
}

export interface TextAreaProps {
  $height?: number;
}
