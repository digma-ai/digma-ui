import type { GetIssuesPayload } from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface AnalyticsProps {
  query?: GetIssuesPayload;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToAssets: () => void;
}
