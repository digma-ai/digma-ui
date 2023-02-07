export interface EnvironmentTabProps {
  text: string;
  hasBadge: boolean;
  isSelected: boolean;
  onClick: (tabId: string) => void;
}

export interface ContainerProps {
  isSelected: boolean;
}
