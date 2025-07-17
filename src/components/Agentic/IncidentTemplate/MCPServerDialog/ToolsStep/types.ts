import type { MCPServerIcon } from "../../../../../redux/services/types";

export interface ToolsStepProps {
  onCancel: () => void;
  onSave: (
    tools: string[],
    instructions: string,
    iconId: string | null
  ) => void;
  icon?: MCPServerIcon;
  tools: string[];
  selectedTools?: string[];
  instructions?: string;
  isLoading?: boolean;
  error?: string;
}

export interface ToolTagProps {
  $isHighlighted?: boolean;
}

export interface ToolTagDeleteButtonProps {
  $isHighlighted?: boolean;
}

export interface DropzoneContainerProps {
  $isDragActive: boolean;
  $isDisabled: boolean;
}

export interface DropzoneContentProps {
  $isDragActive: boolean;
}

export type DropzoneContentIconContainerProps = DropzoneContentProps;
