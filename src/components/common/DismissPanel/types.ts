export interface DismissPanelProps {
  state: "dismissed" | "in-progress" | "visible";
  onShow: () => void;
  onDismiss: () => void;
  confirmationMessage: string;
  className?: string;
}
