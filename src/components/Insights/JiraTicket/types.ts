import { ReactNode } from "react";
import { GenericCodeObjectInsight } from "../types";

export interface JiraTicketThemeColors {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
  };
  icon: string;
}

export interface JiraTicketProps {
  summary: string;
  description: {
    content: ReactNode;
    isLoading?: boolean;
    errorMessage?: string;
  };
  attachment?: { url: string; fileName: string };
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
