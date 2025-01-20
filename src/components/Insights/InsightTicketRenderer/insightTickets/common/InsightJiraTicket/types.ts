import type { ReactNode } from "react";
import type { InsightsQuery } from "../../../../../common/App/types";
import type { Attachment } from "../../../../../common/JiraTicket/types";
import type { GenericCodeObjectInsight } from "../../../../types";

export interface InsightJiraTicketProps {
  summary: string;
  description: {
    content: ReactNode;
    isLoading?: boolean;
    errorMessage?: string;
  };
  attachments?: Attachment[];
  insight: GenericCodeObjectInsight;
  relatedInsight?: GenericCodeObjectInsight | null;
  onClose: () => void;
  onReloadSpanInsight?: () => void;
  refreshInsights: () => void;
  environmentId?: string;
}

export interface InsightsGetDataListQuery {
  query: InsightsQuery;
}

export interface LinkTicketPayload {
  insightId: string;
  ticketLink: string;
  insightType: string;
}

export interface UnlinkTicketPayload {
  insightId: string;
  insightType: string;
}
