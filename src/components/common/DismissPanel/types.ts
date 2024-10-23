export interface DismissPanelProps {
  state: "dismissed" | "in-progress" | "visible";
  onShow: () => void;
  onDismiss: () => void;
  message: string;
}
