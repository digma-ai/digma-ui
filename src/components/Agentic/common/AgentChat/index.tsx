import { Fragment, useEffect, useMemo, useState } from "react";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { MagicWandIcon } from "../../../common/icons/16px/MagicWandIcon";
import { Chat } from "../../common/Chat";
import { Accordion } from "../../IncidentDetails/AgentEvents/Accordion";
import { TypingMarkdown } from "../../IncidentDetails/TypingMarkdown";
import { convertToMarkdown } from "../../IncidentDetails/utils/convertToMarkdown";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { AgentChatProps } from "./types";

const TYPING_SPEED = 3; // in milliseconds per character

export const AgentChat = ({
  incidentId,
  agentId,
  onMessageSend,
  isMessageSending,
  className,
  data,
  isDataLoading,
  onNavigateToIncident,
  attachmentsComponent
}: AgentChatProps) => {
  const [initialEventsCount, setInitialEventsCount] = useState<number>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();

  const handleMessageSend = (text: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_MESSAGE_SUBMITTED,
      {
        agentName: agentId ?? ""
      }
    );

    onMessageSend(text);
  };

  const handleViewIncidentLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_NEW_INCIDENT_LINK_CLICKED);

    if (incidentId) {
      onNavigateToIncident?.(incidentId);
    }
  };

  const handleMarkdownTypingComplete = (i: number) => () => {
    const events = data ?? [];
    const aiEventsIndexes = events.reduce((acc, event, index) => {
      if (event.type === "ai") {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    const nextAiEventIndex = aiEventsIndexes.find((el) => el > i);

    if (isNumber(nextAiEventIndex) && nextAiEventIndex >= 0) {
      setEventsVisibleCount(nextAiEventIndex + 1);
    } else {
      setEventsVisibleCount(events.length);
    }
  };

  useEffect(() => {
    if (data) {
      setInitialEventsCount((prev) => (!isNumber(prev) ? data.length : prev));
      setEventsVisibleCount(data.length);
    }
  }, [data]);

  const visibleEvents = useMemo(
    () =>
      data && isNumber(eventsVisibleCount)
        ? data.slice(0, eventsVisibleCount)
        : [],
    [data, eventsVisibleCount]
  );

  const shouldShowTypingForEvent = (index: number) =>
    Boolean(initialEventsCount && index >= initialEventsCount);

  const renderChatEvent = (event: IncidentAgentEvent, i: number) => {
    switch (event.type) {
      case "ai":
      case "token":
        return (
          <TypingMarkdown
            text={event.message}
            onComplete={
              shouldShowTypingForEvent(i)
                ? handleMarkdownTypingComplete(i)
                : undefined
            }
            speed={shouldShowTypingForEvent(i) ? TYPING_SPEED : undefined}
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
            summary={toolName}
            content={<TypingMarkdown text={convertToMarkdown(event.message)} />}
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
        break;
      }
      case "memory_update":
        return (
          <s.MemoryUpdateMessage>
            <MagicWandIcon color={"currentColor"} />
            Updated saved memory
          </s.MemoryUpdateMessage>
        );
      default:
        return null;
    }
  };

  return (
    <Chat
      attachmentsComponent={attachmentsComponent}
      isInitialLoading={!data && isDataLoading}
      isMessageSending={isMessageSending}
      onMessageSend={handleMessageSend}
      className={className}
      promptFontSize={14}
      chatContent={
        <>
          {visibleEvents?.map((x, i) => (
            <Fragment key={i}>{renderChatEvent(x, i)}</Fragment>
          ))}
        </>
      }
    />
  );
};
