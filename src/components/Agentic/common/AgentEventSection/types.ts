import type {
  IncidentAgentEvent,
  IncidentAgentEventSection
} from "../../../../redux/services/types";

export type AgentEventSectionType = "intro" | "summary";

export interface AgentEventSectionProps {
  data: IncidentAgentEventSection & {
    type?: AgentEventSectionType;
    events: IncidentAgentEvent[];
  };
  onNavigateToIncident?: () => void;
  typeInitialEvents?: boolean;
  index: number;
}

export interface SectionAccordionProps {
  $hue: number;
  $isSticky?: boolean;
}
