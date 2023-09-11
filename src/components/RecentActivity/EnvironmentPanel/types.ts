import { ExtendedEnvironment } from "../types";

export interface EnvironmentPanelProps {
  viewMode: ViewMode;
  environments: ExtendedEnvironment[];
  selectedEnvironment?: ExtendedEnvironment;
  onEnvironmentSelect: (environment: ExtendedEnvironment) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onEnvironmentAdd: (environment: string) => void;
  onEnvironmentDelete: (environment: string) => void;
}

export type ViewMode = "table" | "list";

export type ScrollDirection = "left" | "right";
