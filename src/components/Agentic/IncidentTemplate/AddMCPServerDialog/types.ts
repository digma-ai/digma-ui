export interface AddMCPServerDialogProps {
  onClose: () => void;
  onComplete: (text: string, tools: string[], instructions: string) => void;
}
