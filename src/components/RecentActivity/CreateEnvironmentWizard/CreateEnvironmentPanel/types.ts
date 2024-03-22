export interface CreateEnvironmentPanelProps {
  onCancel: () => void;
  tabs: {
    index: number;
    name: string;
    state: "active" | "confirmed" | "pending";
  }[];
}
