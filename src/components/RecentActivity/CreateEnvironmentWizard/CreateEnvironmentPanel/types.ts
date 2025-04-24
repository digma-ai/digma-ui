import type { StepStatus } from "../types";

export interface CreateEnvironmentPanelProps {
  onCancel: () => void;
  onBack: () => void;
  backDisabled: boolean;
  cancelDisabled: boolean;
  isPanelTitleVisible: boolean;
  isCancelConfirmationEnabled: boolean;
  tabs: {
    index: number;
    name: string;
    state: StepStatus;
  }[];
}
