export interface EnvironmentPanelProps {
  viewMode: ViewMode;
  envs: { name: string; hasBadge: boolean }[];
  selectedEnv?: string;
  onEnvSelect: (tabId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export type ViewMode = "table" | "list";
