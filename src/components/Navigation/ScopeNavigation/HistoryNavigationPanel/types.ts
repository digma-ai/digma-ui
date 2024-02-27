export interface HistoryNavigationPanelProps {
  onGoBack: () => void;
  onGoForward: () => void;
  isBackDisabled: boolean;
  isForwardDisabled: boolean;
}
