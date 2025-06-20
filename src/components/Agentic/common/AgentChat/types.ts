import type { ReactNode } from "react";
import type { IncidentAgentEvent } from "../../../../redux/services/types";

export interface AgentChatProps {
  incidentId?: string;
  agentId?: string;
  onMessageSend: (text: string) => void;
  isMessageSending: boolean;
  className?: string;
  promptFontSize?: number;
  data?: IncidentAgentEvent[];
  isDataLoading: boolean;
  onNavigateToIncident?: (incidentId: string) => void;
  attachmentsComponent?: ReactNode;
}
