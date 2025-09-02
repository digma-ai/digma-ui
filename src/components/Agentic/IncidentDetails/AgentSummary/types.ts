import type {
  AgentStatus,
  IncidentAgentEvent
} from "../../../../redux/services/types";
import type { AgentEventSectionType } from "../../common/AgentEventSection/types";

export interface AgentEventSlice {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  events: IncidentAgentEvent[];
  type: AgentEventSectionType | undefined;
  hasSection: boolean;
}
