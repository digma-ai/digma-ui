import { ExtendedEnvironment } from "../types";

export interface EnvironmentPanelProps {
  environments: ExtendedEnvironment[];
  selectedEnvironment?: ExtendedEnvironment;
  onEnvironmentSelect: (environment: ExtendedEnvironment) => void;
  onEnvironmentAdd: () => void;
  onEnvironmentSetupInstructionsShow: (environmentId: string) => void;
  onEnvironmentDelete: (environmentId: string) => void;
  onDigmathonModeButtonClick: () => void;
}

export type ViewMode = "table" | "list";

export type ScrollDirection = "left" | "right";
