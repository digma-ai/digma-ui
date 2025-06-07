export interface ToolsStepProps {
  onCancel: () => void;
  onSave: (tools: string[], instructions: string) => void;
}

export interface ToolTagProps {
  $isHighlighted?: boolean;
}

export interface ToolTagDeleteButtonProps {
  $isHighlighted?: boolean;
}
