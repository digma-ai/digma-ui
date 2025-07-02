import type { ReactNode } from "react";
import type { IncidentAgentEvent } from "../../../../redux/services/types";

export interface AgentChatProps {
  agentId?: string;
  onMessageSend: (text: string) => void;
  isMessageSending: boolean;
  className?: string;
  promptFontSize?: number;
  data?: IncidentAgentEvent[];
  isDataLoading: boolean;
  onNavigateToIncident?: () => void;
  attachmentsComponent?: ReactNode;
  typeInitialMessages?: boolean;
  conversationId?: string;
}
