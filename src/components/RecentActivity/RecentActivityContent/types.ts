import type { Environment } from "../../../redux/services/types";
import type { EnvironmentInstructionsVisibility } from "../types";

export interface RecentActivityContentProps {
  environment?: Environment;
  environmentInstructionsVisibility: EnvironmentInstructionsVisibility;
  headerHeight: number;
  clearDataTimestamp: string | undefined;
  onEnvironmentSetupInstructionsClose: () => void;
}
