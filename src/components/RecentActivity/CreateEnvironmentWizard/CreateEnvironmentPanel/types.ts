import { StepStatus } from "../../../InstallationWizard/Step/types";

export interface CreateEnvironmentPanelProps {
  onCancel: () => void;
  tabs: {
    index: number;
    name: string;
    state: StepStatus;
  }[];
}
