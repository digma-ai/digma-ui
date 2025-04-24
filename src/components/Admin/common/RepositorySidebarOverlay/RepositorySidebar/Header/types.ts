import type {
  GetIssuesPayload,
  GetSpanInfoResponse
} from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";
import type { Scope } from "../../../../../common/App/types";

export interface HeaderProps {
  scope: Scope;
  onGoBack: () => void;
  onGoForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  spanInfo?: GetSpanInfoResponse;
  onTabSelect: (tabId: string) => void;
  selectedTabId: string;
  query?: GetIssuesPayload;
  onScopeChange: (payload: ChangeScopePayload) => void;
}
