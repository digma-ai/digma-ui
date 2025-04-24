import type { ReactNode } from "react";
import type {
  Environment,
  EnvironmentType
} from "../../../redux/services/types";

export interface CreateEnvironmentWizardProps {
  onClose: (id: string | null) => void;
  isPanelTitleVisible?: boolean;
  isCentralizedDeployment: boolean;
  finishScreenContent: ReactNode;
  onCreate: (environment: Environment) => void;
  onCancel?: () => void;
  isCancelConfirmationEnabled: boolean;
  trackingPrefix?: string;
}

export interface StepProps {
  $isVisible: boolean;
}

export type StepStatus = "completed" | "active" | "not-completed" | "error";

export interface StepDefinitions {
  key: string;
  status: StepStatus;
  name: string;
  isFinished?: boolean;
  isHidden?: boolean;
  errors?: ErrorDefinitions;
}

export type ErrorDefinitions = Record<string, string>;

export interface EnvironmentDraft {
  id: string;
  name: string;
  type: EnvironmentType | null;
}
