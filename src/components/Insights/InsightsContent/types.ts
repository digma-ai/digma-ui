import type { InsightsData } from "../../../store/insights/insightsSlice";
import type { ChangeScopePayload } from "../../../utils/actions/changeScope";
import type { GenericCodeObjectInsight } from "../types";

export interface InsightsContentProps {
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToTab: (tabId: string) => void;
  isLoading: boolean;
  data: InsightsData | null;
  onRefresh: () => void;
  className?: string;
  onOpenSuggestion?: (insightId: string) => void;
  isJiraTicketHintEnabled?: boolean;
  onJiraTicketPopupOpen?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onJiraTicketPopupClose?: () => void;
  infoToOpenJiraTicket?: {
    insight: GenericCodeObjectInsight;
    spanCodeObjectId?: string;
  };
}
