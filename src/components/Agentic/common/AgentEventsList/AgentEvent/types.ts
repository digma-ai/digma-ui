import type {
  IncidentAgentEvent,
  IncidentAgentEventStatus
} from "../../../../../redux/services/types";

export interface AgentEventProps {
  event: IncidentAgentEvent;
  onNavigateToIncident?: () => void;
  onEventTypingComplete: (id: string) => void;
  isEventTypingRequired: boolean;
}

export interface ToolNameProps {
  $status?: IncidentAgentEventStatus;
}
