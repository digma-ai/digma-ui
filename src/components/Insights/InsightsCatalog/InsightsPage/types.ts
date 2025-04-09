import type { InsightType } from "../../../../types";
import type { GenericCodeObjectInsight } from "../../types";
export interface InsightsPageProps {
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  isMarkAsReadButtonEnabled: boolean;
}

export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
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
