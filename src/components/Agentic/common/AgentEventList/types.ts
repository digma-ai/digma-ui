import type { IncidentAgentEvent } from "../../../../redux/services/types";

export interface AgentEventListProps {
  events: IncidentAgentEvent[];
  onNavigateToIncident?: () => void;
  typeInitialEvents?: boolean;
}

export interface RenderState {
  currentEventIndex: number;
  isTyping: boolean;
}
