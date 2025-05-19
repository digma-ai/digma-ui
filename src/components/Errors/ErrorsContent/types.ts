import type { GetAboutResponse } from "../../../redux/services/types";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { BackendInfo } from "../../common/App/types";

export interface ErrorsContentProps {
  onGoToAssets: () => void;
  onGoToErrors: () => void;
  onErrorSelect: (errorId: string) => void;
  spanCodeObjectId?: string;
  methodId?: string;
  errorId?: string;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  className?: string;
  environmentId?: string;
  selectedServices?: string[];
  onScopeChange: (payload: ChangeScopePayload) => void;
}
