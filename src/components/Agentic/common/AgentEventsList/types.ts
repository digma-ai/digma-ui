import type { IncidentAgentEvent } from "../../../../redux/services/types";

export interface AgentEventsListProps {
  events: IncidentAgentEvent[];
  onNavigateToIncident?: () => void;
  typeInitialEvents?: boolean;
}
