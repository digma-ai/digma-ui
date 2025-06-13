import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useGetIncidentAgentChatEventsQuery } from "../../../../redux/services/digma";
import type { IncidentAgentChatEvent } from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Chat } from "../../common/Chat";
import { Accordion } from "../../IncidentDetails/AgentEvents/Accordion";
import { TypingMarkdown } from "../../IncidentDetails/TypingMarkdown";
import { convertToMarkdown } from "../../IncidentDetails/utils/convertToMarkdown";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { AgentChatProps } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const REFRESH_INTERVAL_DURING_STREAMING = 3 * 1000; // in milliseconds
const TYPING_SPEED = 3; // in milliseconds per character

export const AgentChat = ({
  incidentId,
  agentId,
  onMessageSend,
  isMessageSending,
  className
}: AgentChatProps) => {
  const [initialEventsCount, setInitialEventsCount] = useState<number>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();

  const { data, isLoading } = useGetIncidentAgentChatEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: agentId ?? ""
    },
    {
      skip: !incidentId || !agentId,
      pollingInterval: isMessageSending
        ? REFRESH_INTERVAL_DURING_STREAMING
        : REFRESH_INTERVAL
    }
  );

  const handleMessageSend = (text: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_MESSAGE_SUBMITTED,
      {
        agentName: agentId ?? ""
      }
    );

    onMessageSend(text);
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

  const renderChatEvent = (event: IncidentAgentChatEvent, i: number) => {
    switch (event.type) {
      case "ai":
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
      case "tool":
        return (
          <Accordion
            summary={`${event.tool_name} (${[event.mcp_name, "MCP tool"]
              .filter(Boolean)
              .join(" ")})`}
            content={<TypingMarkdown text={convertToMarkdown(event.message)} />}
          />
        );
      case "human":
        return <s.HumanMessage>{event.message}</s.HumanMessage>;
      case "agent_end": {
        if (event.agent_name === "incident_entry") {
          return (
            <s.AgentMessage>
              New incident has been created.{" "}
              <Link to={`/incidents/${incidentId}`}>View</Link>
            </s.AgentMessage>
          );
        }
        break;
      }
      default:
        return null;
    }
  };

  return (
    <Chat
      isInitialLoading={!data && isLoading}
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
