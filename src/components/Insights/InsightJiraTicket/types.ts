import { ReactNode } from "react";
import { InsightsQuery } from "../../common/App/types";
import { GenericCodeObjectInsight } from "../types";

export interface InsightJiraTicketProps {
  summary: string;
  description: {
    content: ReactNode;
    isLoading?: boolean;
    errorMessage?: string;
  };
  attachments?: ({ url: string; fileName: string } | undefined)[];
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
