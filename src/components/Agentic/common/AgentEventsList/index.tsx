import { useMemo, useState } from "react";
import { AgentEvent } from "./AgentEvent";
import type { AgentEventsListProps } from "./types";

// TODO: fix
export const AgentEventsList = ({
  events,
  onNavigateToIncident,
  typeInitialEvents
}: AgentEventsListProps) => {
  const [initialEventsCount] = useState<number>(
    typeInitialEvents ? 0 : events.length
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [eventsVisibleCount, setEventsVisibleCount] = useState<number>(
    typeInitialEvents ? 0 : events.length
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastRenderedAgentEventIndex, setLastRenderedAgentEventIndex] =
    useState<number | undefined>(
      typeInitialEvents
        ? undefined
        : events.length > 0
        ? events.length - 1
        : undefined
    );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    setLastRenderedAgentEventIndex(i);

    // const nextAgentEventIndex = agentEventsIndexes.find((el) => el > i);

    // if (isNumber(nextAgentEventIndex) && nextAgentEventIndex >= 0) {
    //   setEventsVisibleCount(nextAgentEventIndex + 1);
    // } else {
    //   setEventsVisibleCount(events.length);
    // }
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
