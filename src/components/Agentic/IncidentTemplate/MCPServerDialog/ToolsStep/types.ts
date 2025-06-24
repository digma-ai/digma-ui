export interface ToolsStepProps {
  onCancel: () => void;
  onSave: (tools: string[], instructions: string) => void;
  tools: string[];
  selectedTools?: string[];
  isLoading?: boolean;
  error?: string;
}

export interface ToolTagProps {
  $isHighlighted?: boolean;
}

export interface ToolTagDeleteButtonProps {
  $isHighlighted?: boolean;
}
