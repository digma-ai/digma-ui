import type { ReactNode } from "react";
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
}
