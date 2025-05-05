import type { Environment } from "../../../redux/services/types";
import type { ViewMode } from "../EnvironmentPanel/types";

export interface RecentActivityToolbarProps {
  showToolbar?: boolean;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  environment?: Environment;
  className?: string;
}
