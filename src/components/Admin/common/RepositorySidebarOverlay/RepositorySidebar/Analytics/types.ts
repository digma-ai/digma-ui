import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface AnalyticsProps {
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToTab: (tabId: string) => void;
}
