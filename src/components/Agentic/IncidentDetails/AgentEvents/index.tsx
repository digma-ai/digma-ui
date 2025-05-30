import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentEventsQuery,
  useGetIncidentAgentsQuery
} from "../../../../redux/services/digma";
import type { GetIncidentAgentEventsResponse } from "../../../../redux/services/types";
import { isNumber } from "../../../../typeGuards/isNumber";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { TypingMarkdown } from "../TypingMarkdown";
import { useAutoScroll } from "../useAutoScroll";
import { convertToMarkdown } from "../utils/convertToMarkdown";
import { Accordion } from "./Accordion";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const TYPING_SPEED = 3; // in milliseconds per character

export const AgentEvents = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const [initialEventsCount, setInitialEventsCount] = useState<number>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();
  const { elementRef, handleElementScroll } = useAutoScroll<HTMLDivElement>();

  const { data: agentsData } = useGetIncidentAgentsQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  const { data: agentEventsData, isLoading } = useGetIncidentAgentEventsQuery(
    { incidentId: incidentId ?? "", agentId: agentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId || !agentId
    }
  );

  const handleMarkdownTypingComplete = (i: number) => () => {
    const events = agentEventsData ?? [];
    const tokenEventsIndexes = events.reduce((acc, event, index) => {
      if (event.type === "token") {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    const nextTokenEventIndex = tokenEventsIndexes.find((el) => el > i);

    if (isNumber(nextTokenEventIndex) && nextTokenEventIndex >= 0) {
      setEventsVisibleCount(nextTokenEventIndex + 1);
    } else {
      setEventsVisibleCount(events.length);
    }
  };

  useEffect(() => {
    if (agentEventsData) {
      setInitialEventsCount((prev) =>
        !isNumber(prev) ? agentEventsData.length : prev
      );
      setEventsVisibleCount(agentEventsData.length);
    }
  }, [agentEventsData]);

  const visibleEvents = useMemo(
    () =>
      agentEventsData && isNumber(eventsVisibleCount)
        ? agentEventsData.slice(0, eventsVisibleCount)
        : [],
    [agentEventsData, eventsVisibleCount]
  );

  const isAgentRunning = useMemo(
    () => Boolean(agentsData?.agents.find((x) => x.name === agentId)?.running),
    [agentsData, agentId]
  );

  const shouldShowTypingForEvent = (index: number) =>
    isNumber(initialEventsCount) && index >= initialEventsCount;

  const renderEvent = (
    event: GetIncidentAgentEventsResponse[number],
    i: number
  ) => {
    switch (event.type) {
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
      case "tool":
        return (
          <Accordion
            summary={`${event.tool_name} (${[event.mcp_name, "MCP tool"]
              .filter(Boolean)
              .join(" ")})`}
            content={<TypingMarkdown text={convertToMarkdown(event.message)} />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <s.Container ref={elementRef} onScroll={handleElementScroll}>
      {!agentEventsData && isLoading && (
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      )}
      {visibleEvents.map((x, i) => (
        <Fragment key={i}>{renderEvent(x, i)}</Fragment>
      ))}
      {isAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
