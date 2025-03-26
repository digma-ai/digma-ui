export interface HistoryNavigationPanelProps {
  isAtHome: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
}

export interface ContainerProps {
  $isActive: boolean;
}
