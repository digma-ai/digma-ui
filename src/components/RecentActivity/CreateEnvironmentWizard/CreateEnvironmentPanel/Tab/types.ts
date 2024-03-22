import { StepStatus } from "../../../../InstallationWizard/Step/types";

export interface TabProps {
  index: number;
  name: string;
  state: StepStatus;
}

export interface IndexProps {
  $state: StepStatus;
}

export interface NameProps {
  $isActive: boolean;
}
