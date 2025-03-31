import type { GetSpanInfoResponse } from "../../../../../../redux/services/types";
import type { Scope } from "../../../../../common/App/types";

export interface HeaderProps {
  onCloseButtonClick: () => void;
  scope: Scope;
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  spanInfo?: GetSpanInfoResponse;
  onTabSelect: (tabId: string) => void;
  selectedTabId: string;
}
