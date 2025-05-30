import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentEventsQuery,
  useGetIncidentAgentsQuery
} from "../../../../redux/services/digma";
import type { GetIncidentAgentEventsResponse } from "../../../../redux/services/types";
import { isBoolean } from "../../../../typeGuards/isBoolean";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { TypingMarkdown } from "../TypingMarkdown";
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
  const [initialAgentRunning, setInitialAgentRunning] = useState<boolean>();
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>();
  const [data, setData] = useState<GetIncidentAgentEventsResponse>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const scrollHeightRef = useRef<number>(0);

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
      skip: !incidentId || !agentId || !isBoolean(initialAgentRunning)
    }
  );

  const handleMarkdownTypingComplete = (i: number) => () => {
    const events = data ?? [];
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

  const handleContainerScroll = () => {
    const isAtBottom = () => {
      if (!containerRef.current) {
        return false;
      }
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      return scrollHeight - scrollTop <= clientHeight + 1; // Allow a small buffer for precision issues
    };

    if (!containerRef.current) {
      return;
    }

    setShouldAutoScroll(isAtBottom());
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Handle scroll height changes and auto-scroll
  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const checkScrollHeight = () => {
      const currentScrollHeight = element.scrollHeight;

      // Only auto-scroll if height has grown and auto-scroll is enabled
      if (currentScrollHeight > scrollHeightRef.current && shouldAutoScroll) {
        scrollToBottom();
      }

      scrollHeightRef.current = currentScrollHeight;
    };

    const mutationObserver = new MutationObserver(() => {
      // Use RAF to ensure DOM is updated before measuring
      requestAnimationFrame(checkScrollHeight);
    });

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Initial setup
    scrollHeightRef.current = element.scrollHeight;
    scrollToBottom();

    return () => {
      mutationObserver.disconnect();
    };
  }, [shouldAutoScroll]);

  useEffect(() => {
    setData(agentEventsData);
  }, [agentEventsData]);

  // Set agent initial running state
  useEffect(() => {
    if (!isBoolean(initialAgentRunning)) {
      const agent = agentsData?.agents.find((x) => x.name === agentId);
      setInitialAgentRunning(agent?.running);
    }
  }, [agentsData, agentId, initialAgentRunning]);

  // Set initial visible count based on agent initial running state
  useEffect(() => {
    if (
      isBoolean(initialAgentRunning) &&
      isUndefined(eventsVisibleCount) &&
      data
    ) {
      const initialCount = initialAgentRunning ? 1 : data.length;
      setEventsVisibleCount(initialCount);
    }
  }, [initialAgentRunning, eventsVisibleCount, data]);

  const visibleEvents = useMemo(
    () =>
      data && isNumber(eventsVisibleCount)
        ? data.slice(0, eventsVisibleCount)
        : [],
    [data, eventsVisibleCount]
  );

  return (
    <s.Container ref={containerRef} onScroll={handleContainerScroll}>
      {!data && isLoading && (
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      )}
      {visibleEvents.map((x, i) => (
        <Fragment key={i}>
          {x.type === "tool" ? (
            <Accordion
              summary={`${x.tool_name} (${[x.mcp_name, "MCP tool"]
                .filter(Boolean)
                .join(" ")})`}
              content={<TypingMarkdown text={convertToMarkdown(x.message)} />}
            />
          ) : (
            <TypingMarkdown
              text={x.message}
              onComplete={
                initialAgentRunning
                  ? handleMarkdownTypingComplete(i)
                  : undefined
              }
              speed={initialAgentRunning ? TYPING_SPEED : undefined}
            />
          )}
        </Fragment>
      ))}
      {initialAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
