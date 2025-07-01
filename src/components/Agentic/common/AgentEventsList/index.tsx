import { useEffect, useMemo, useState } from "react";
import { isNumber } from "../../../../typeGuards/isNumber";
import { AgentEvent } from "./AgentEvent";
import type { AgentEventsListProps } from "./types";

export const AgentEventsList = ({
  events,
  onNavigateToIncident,
  typeInitialEvents
}: AgentEventsListProps) => {
  const [initialEventsCount] = useState<number>(
    typeInitialEvents ? 0 : events.length
  );
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>(
    typeInitialEvents ? 0 : events.length
  );

  const agentEventsIndexes = useMemo(
    () =>
      events.reduce((acc, event, index) => {
        if (["ai", "token"].includes(event.type)) {
          acc.push(index);
        }
        return acc;
      }, [] as number[]),
    [events]
  );

  const handleEventTypingComplete = (id: string) => {
    const i = events.findIndex((x) => x.id === id);

    const nextAgentEventIndex = agentEventsIndexes.find((el) => el > i);

    if (isNumber(nextAgentEventIndex)) {
      setEventsVisibleCount(nextAgentEventIndex + 1);
    } else {
      setEventsVisibleCount(events.length);
    }
  };

  const visibleEvents = useMemo(
    () => events.slice(0, eventsVisibleCount),
    [events, eventsVisibleCount]
  );

  const shouldShowTypingForEvent = (id: string) => {
    const index = visibleEvents.findIndex((x) => x.id === id);

    if (index < 0) {
      return false;
    }

    return index >= initialEventsCount;
  };

  useEffect(() => {
    if (events.length > eventsVisibleCount) {
      const nextAgentEventIndex = agentEventsIndexes.find(
        (index) => index >= eventsVisibleCount
      );

      if (isNumber(nextAgentEventIndex)) {
        setEventsVisibleCount(nextAgentEventIndex + 1);
      } else {
        setEventsVisibleCount(events.length);
      }
    }
  }, [events.length, eventsVisibleCount, agentEventsIndexes]);

  return visibleEvents.map((event) => (
    <AgentEvent
      key={event.id}
      event={event}
      onNavigateToIncident={onNavigateToIncident}
      onEventTypingComplete={handleEventTypingComplete}
      isEventTypingRequired={shouldShowTypingForEvent(event.id)}
    />
  ));
};
