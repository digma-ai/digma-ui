import type { Environment } from "../../../redux/services/types";
import type { ViewMode } from "../EnvironmentPanel/types";
import type { EnvironmentInstructionsVisibility } from "../types";

export interface RecentActivityContentProps {
  environment?: Environment;
  environmentInstructionsVisibility: EnvironmentInstructionsVisibility;
  headerHeight: number;
  clearDataTimestamp: string | undefined;
  onEnvironmentSetupInstructionsClose: () => void;
  now: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}
