import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { MagicWandIcon } from "../../../../common/icons/16px/MagicWandIcon";
import { trackingEvents } from "../../../tracking";
import { Accordion } from "../../Accordion";
import { AgentEventSection } from "../../AgentEventSection";
import * as s from "./styles";
import type { AgentEventProps } from "./types";
import { TypingMarkdown } from "./TypingMarkdown";

const TYPING_SPEED = 3; // in milliseconds per character

export const AgentEvent = ({
  event,
  index,
  eventsCount,
  onNavigateToIncident,
  onEventTypingComplete,
  isEventTypingRequired
}: AgentEventProps) => {
  const handleViewIncidentLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_NEW_INCIDENT_LINK_CLICKED);

    onNavigateToIncident?.();
  };

  const handleEventTypingComplete = () => {
    onEventTypingComplete(event.id);
  };

  switch (event.type) {
    case "ai":
    case "token":
      return (
        <TypingMarkdown
          text={event.message}
          onComplete={
            isEventTypingRequired ? handleEventTypingComplete : undefined
          }
          speed={isEventTypingRequired ? TYPING_SPEED : undefined}
        />
      );
    case "tool": {
      let toolName = event.tool_name;

      if (event.mcp_name) {
        toolName += ` (${[event.mcp_name, "MCP tool"]
          .filter(Boolean)
          .join(" ")})`;
      }

      return (
        <Accordion
          summary={<s.ToolName $status={event.status}>{toolName}</s.ToolName>}
          content={<TypingMarkdown text={event.message} />}
        />
      );
    }
    case "human":
      return <s.HumanMessage>{event.message}</s.HumanMessage>;
    case "agent_end": {
      if (event.agent_name === "incident_entry") {
        return (
          <s.AgentMessage>
            New incident has been created.{" "}
            <s.StyledLink onClick={handleViewIncidentLinkClick}>
              View
            </s.StyledLink>
          </s.AgentMessage>
        );
      }

      return null;
    }
    case "memory_update":
      return (
        <s.MemoryUpdateMessage>
          <MagicWandIcon color={"currentColor"} />
          Updated saved memory
        </s.MemoryUpdateMessage>
      );
    case "section": {
      const type =
        index === 0
          ? "intro"
          : index === eventsCount - 1
            ? "summary"
            : undefined;
      return <AgentEventSection data={event} type={type} index={index} />;
    }
    default:
      return null;
  }
};
