import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentChatEventsQuery,
  useSendMessageToIncidentAgentChatMutation
} from "../../../../redux/services/digma";
import type { IncidentAgentChatEvent } from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isString } from "../../../../typeGuards/isString";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { Accordion } from "../AgentEvents/Accordion";
import { TypingMarkdown } from "../TypingMarkdown";
import { useAutoScroll } from "../useAutoScroll";
import { convertToMarkdown } from "../utils/convertToMarkdown";
import { PromptInput } from "./PromptInput";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const TYPING_SPEED = 3; // in milliseconds per character

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const [lastSentMessage, setLastSentMessage] = useState<string>();
  const { elementRef, handleElementScroll, scrollToBottom } =
    useAutoScroll<HTMLDivElement>();
  const [initialEventsCount, setInitialEventsCount] = useState<number>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();

  const { data, isLoading } = useGetIncidentAgentChatEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: agentId ?? ""
    },
    {
      skip: !incidentId || !agentId! || isString(lastSentMessage),
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageToIncidentAgentChatMutation();

  const handleInputSubmit = () => {
    setInputValue("");
    setLastSentMessage(inputValue);
    scrollToBottom();

    void sendMessage({
      incidentId: incidentId ?? "",
      agentId: agentId ?? "",
      data: { text: inputValue }
    }).finally(() => {
      setLastSentMessage(undefined);
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
        {lastSentMessage && <s.HumanMessage>{lastSentMessage}</s.HumanMessage>}
        {isMessageSending && <ThreeCirclesSpinner />}
      </s.ChatHistory>
      <PromptInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleInputSubmit}
        isSubmitting={isMessageSending}
      />
    </s.Container>
  );
};
