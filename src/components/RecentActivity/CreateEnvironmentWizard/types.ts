export interface CreateEnvironmentWizardProps {
  onClose: (id: string | null) => void;
}

export interface StepProps {
  $isVisible: boolean;
}

export type StepStatus = "completed" | "active" | "not-completed";

export interface StepDefinitions {
  key: string;
  status: StepStatus;
  name: string;
  isFinished?: boolean;
  isHidden?: boolean;
  errors?: [];
}
