import type { GetAboutResponse } from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { BackendInfo } from "../../common/App/types";

export interface GlobalErrorsListProps {
  environmentId?: string;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  services?: string[];
  spanCodeObjectId?: string;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onErrorSelect: (errorId: string) => void;
}

export interface SetPinUnpinErrorResultPayload {
  id: string;
  status: "success" | "failure";
}

export interface DismissBtnIconProps {
  $isDismissedMode: boolean;
}
