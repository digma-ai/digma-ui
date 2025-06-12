import type { GetIssuesPayload } from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface IssuesProps {
  isTransitioning: boolean;
  query?: GetIssuesPayload;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToTab: (tabId: string) => void;
}

export interface DrawerContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
