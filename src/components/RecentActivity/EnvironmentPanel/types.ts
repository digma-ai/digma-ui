export interface EnvironmentPanelProps {
  viewMode: ViewMode;
  environments: { name: string; hasBadge: boolean }[];
  selectedEnvironment?: string;
  onEnvironmentSelect: (tabId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export type ViewMode = "table" | "list";
