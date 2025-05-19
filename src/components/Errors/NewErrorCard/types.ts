import type {
  ErrorListItem,
  GetAboutResponse
} from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { BackendInfo } from "../../common/App/types";

export interface NewErrorCardProps {
  data: ErrorListItem;
  onSourceLinkClick: (
    codeObjectId: string,
    spanCodeObjectId?: string | null
  ) => void;
  onPinStatusChange: (errorId: string) => void;
  onDismissStatusChange: (errorId: string) => void;
  onPinStatusToggle: () => void;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  onScopeChange: (payload: ChangeScopePayload) => void;
  environmentId?: string;
}

export interface ContainerProps {
  $isPinned?: boolean;
  $isCritical?: boolean;
}

export interface OccurrenceChartContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}

export interface DismissUndismissResultPayload {
  id: string;
  status: "success" | "failure";
}
