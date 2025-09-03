import { useEffect, useMemo, useState } from "react";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { AgentEvent } from "./AgentEvent";
import type { AgentEventListProps, RenderState } from "./types";

const isTypingEvent = (event: IncidentAgentEvent) =>
  ["ai", "token"].includes(event.type);

export const AgentEventList = ({
  events,
  onNavigateToIncident,
  typeInitialEvents
}: AgentEventListProps) => {
  const [initialVisibleCount] = useState(() =>
    typeInitialEvents ? 0 : events.length
  );

  const [renderState, setRenderState] = useState<RenderState>({
    currentEventIndex: initialVisibleCount - 1,
    isTyping: false
  });

  const handleEventTypingComplete = (id: string) => {
    const completedEventIndex = events.findIndex((event) => event.id === id);

    const nextTypingEventIndex = events.findIndex(
      (event, index) => index > completedEventIndex && isTypingEvent(event)
    );

    if (nextTypingEventIndex !== -1) {
      setRenderState({
        currentEventIndex: nextTypingEventIndex,
        isTyping: true
      });
    } else {
      setRenderState({
        currentEventIndex: events.length - 1,
        isTyping: false
      });
    }
  };

  const shouldShowTypingForEvent = (id: string) => {
    const eventIndex = events.findIndex((event) => event.id === id);
    return (
      eventIndex >= initialVisibleCount &&
      eventIndex === renderState.currentEventIndex &&
      renderState.isTyping
    );
  };

  // Handle new events
  useEffect(() => {
    if (renderState.currentEventIndex >= events.length - 1) {
      return;
    }

    if (renderState.isTyping) {
      return;
    }

    const nextEventIndex = renderState.currentEventIndex + 1;
    const nextEvent = events[nextEventIndex];

    const isInitialEvent = nextEventIndex < initialVisibleCount;

    // Start typing if
    // either it's an initial event with typeInitialEvents=true
    // or
    // it's a new event
    if (
      isTypingEvent(nextEvent) &&
      ((isInitialEvent && typeInitialEvents) || !isInitialEvent)
    ) {
      setRenderState({
        currentEventIndex: nextEventIndex,
        isTyping: true
      });
      return;
    }

    // Otherwise, show the next event immediately
    setRenderState((prev) => ({
      ...prev,
      currentEventIndex: nextEventIndex
    }));
  }, [
    events,
    renderState.currentEventIndex,
    renderState.isTyping,
    initialVisibleCount,
    typeInitialEvents
  ]);

  const visibleEvents = useMemo(
    () => events.slice(0, renderState.currentEventIndex + 1),
    [events, renderState.currentEventIndex]
  );

  return visibleEvents.map((event, i) => (
    <AgentEvent
      key={event.id}
      event={event}
      index={i}
      eventsCount={visibleEvents.length}
      onNavigateToIncident={onNavigateToIncident}
      onEventTypingComplete={handleEventTypingComplete}
      isEventTypingRequired={shouldShowTypingForEvent(event.id)}
    />
  ));
};
