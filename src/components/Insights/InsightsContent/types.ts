import type {
  GetAboutResponse,
  GetEnvironmentsResponse
} from "../../../redux/services/types";
import type { InsightsData } from "../../../store/insights/insightsSlice";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { BackendInfo } from "../../common/App/types";
import type { InsightViewType } from "../types";

export interface InsightsContentProps {
  insightViewType?: InsightViewType;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToTab: (tabId: string) => void;
  isTransitioning?: boolean;
  isRegistrationInProgress?: boolean;
  isRegistrationEnabled?: boolean;
  backendInfo: BackendInfo | GetAboutResponse | null;
  environments?: GetEnvironmentsResponse;
  isLoading: boolean;
  data: InsightsData | null;
  onRefresh: () => void;
  className?: string;
}
