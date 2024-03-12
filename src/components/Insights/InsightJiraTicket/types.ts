import { ReactNode } from "react";
import { InsightsQuery } from "../../common/App/types";
import { GenericCodeObjectInsight } from "../types";
import { Attachment } from "../../common/JiraTicket/types";

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
  codeObjectId: string;
  insightType: string;
}

export interface InsightsGetDataListQuery {
  query: InsightsQuery;
}
