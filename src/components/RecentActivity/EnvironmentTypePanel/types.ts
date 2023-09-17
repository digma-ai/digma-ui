export interface EnvironmentTypePanelProps {
  onEnvironmentTypeSelect: (type: "local" | "ci") => void;
}

export type EnvironmentType = "local" | "ci";
