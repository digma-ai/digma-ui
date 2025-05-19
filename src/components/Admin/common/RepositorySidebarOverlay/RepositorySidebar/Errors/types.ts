import type { GetIssuesPayload } from "../../../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../../../utils/actions/changeScope";

export interface ErrorsProps {
  query?: GetIssuesPayload;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToAssets: () => void;
  selectedErrorId?: string;
  onSelectedErrorIdChange: (errorId?: string) => void;
}
