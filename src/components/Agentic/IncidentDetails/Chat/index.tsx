import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentChatEventsQuery,
  useSendMessageToIncidentAgentChatMutation
} from "../../../../redux/services/digma";
import type { IncidentAgentChatEvent } from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { PromptInput } from "../../common/PromptInput";
import { trackingEvents } from "../../tracking";
import { Accordion } from "../AgentEvents/Accordion";
import { TypingMarkdown } from "../TypingMarkdown";
import { useAutoScroll } from "../useAutoScroll";
import { convertToMarkdown } from "../utils/convertToMarkdown";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const TYPING_SPEED = 3; // in milliseconds per character

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const { elementRef, handleElementScroll, scrollToBottom } =
    useAutoScroll<HTMLDivElement>();
  const [initialEventsCount, setInitialEventsCount] = useState<number>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();

  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageToIncidentAgentChatMutation();

  const { data, isLoading } = useGetIncidentAgentChatEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: agentId ?? ""
    },
    {
      skip: !incidentId || !agentId!,
      pollingInterval: isMessageSending ? 3 : REFRESH_INTERVAL
    }
  );

  const handleInputSubmit = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_MESSAGE_SUBMITTED,
      {
        agentName: agentId ?? ""
      }
    );
    setInputValue("");
    scrollToBottom();

    void sendMessage({
      incidentId: incidentId ?? "",
      agentId: agentId ?? "",
      data: { text: inputValue }
    });
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

      default:
        return null;
    }
  };

  return (
    <s.Container>
      <s.ChatHistory ref={elementRef} onScroll={handleElementScroll}>
        {!data && isLoading && (
          <s.LoadingContainer>
            <Spinner size={32} />
          </s.LoadingContainer>
        )}
        {visibleEvents?.map((x, i) => (
          <Fragment key={i}>{renderChatEvent(x, i)}</Fragment>
        ))}
        {isMessageSending && <ThreeCirclesSpinner />}
      </s.ChatHistory>
      <PromptInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleInputSubmit}
        isSubmitting={isMessageSending}
        placeholder={"Write your prompt here"}
      />
    </s.Container>
  );
};
