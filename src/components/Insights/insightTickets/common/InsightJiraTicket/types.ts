import { ReactNode } from "react";
import { InsightsQuery } from "../../../../common/App/types";
import { Attachment } from "../../../../common/JiraTicket/types";
import { GenericCodeObjectInsight } from "../../../types";

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
}

export interface LinkTicketResponse {
  ticketLink: string | null;
  success: boolean;
  message: string | null;
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
