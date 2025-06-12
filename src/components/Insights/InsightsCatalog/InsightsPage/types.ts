import type { InsightType } from "../../../../types";
import type { ChangeScopePayload } from "../../../../utils/actions/changeScope";
import type { GenericCodeObjectInsight } from "../../types";
export interface InsightsPageProps {
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  isMarkAsReadButtonEnabled: boolean;
  onScopeChange: (payload: ChangeScopePayload) => void;
  onGoToTab: (tabId: string) => void;
  onOpenSuggestion?: (insightId: string) => void;
  isJiraTicketHintEnabled: boolean;
}

export interface MarkInsightTypesAsViewedPayload {
  insightTypes: {
    type: InsightType;
    reopenCount: number;
  }[];
}

export interface RecalculatePayload {
  id: string;
}

export interface OpenLiveViewPayload {
  codeObjectId: string;
}

export interface OpenHistogramPayload {
  spanCodeObjectId: string;
  insightType: InsightType;
  displayName: string;
}
