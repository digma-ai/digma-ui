import type { IncidentAgentEvent } from "../../../../redux/services/types";

export type AgentEventSectionType = "intro" | "summary";

export interface AgentEventSectionProps {
  data: IncidentAgentEvent;
  type?: AgentEventSectionType;
  typeInitialEvents?: boolean;
  index: number;
}

export interface SectionAccordionProps {
  $hue: number;
  $isSticky?: boolean;
}
