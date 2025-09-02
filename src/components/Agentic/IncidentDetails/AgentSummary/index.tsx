import { Fragment, useMemo } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { useGetIncidentAgentsQuery } from "../../../../redux/services/digma";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { AgentEventList } from "../../common/AgentEventList";
import { mockedAgentEvents } from "../../common/AgentEventList/mockData";
import { AgentEventSection } from "../../common/AgentEventSection";
import { useAutoScroll } from "../useAutoScroll";
import * as s from "./styles";
import type { AgentEventSlice } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const agentEventsData: IncidentAgentEvent[] = mockedAgentEvents.filter(
  (event) => event.type !== "human"
);

const isLoading = false;

export const AgentSummary = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const { elementRef, handleElementScroll } = useAutoScroll<HTMLDivElement>();

  const { data: agentsData } = useGetIncidentAgentsQuery(
    { id: incidentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId
    }
  );

  // const { data: agentEventsData, isLoading } = useGetIncidentAgentEventsQuery(
  //   { incidentId: incidentId ?? "", agentId: agentId ?? "" },
  //   {
  //     pollingInterval: REFRESH_INTERVAL,
  //     skip: !incidentId || !agentId
  //   }
  // );

  const isAgentRunning = useMemo(
    () =>
      Boolean(
        agentsData?.agents.find((x) => x.name === agentId)?.status === "running"
      ),
    [agentsData, agentId]
  );

  const slices: AgentEventSlice[] = useMemo(() => {
    const result: AgentEventSlice[] = [];

    if (agentEventsData.length === 0) {
      return result;
    }

    let currentSlice: IncidentAgentEvent[] = [];
    let currentSectionId: string | null = null;

    for (let i = 0; i < agentEventsData.length; i++) {
      const event = agentEventsData[i];
      const eventSectionId = event.section?.id ?? null;

      // If this is the first event or section changes
      if (i === 0 || eventSectionId !== currentSectionId) {
        // Process previous slice if it exists
        if (currentSlice.length > 0) {
          const firstEvent = currentSlice[0];

          result.push({
            // TODO: get section metadata from corresponding API endpoint
            id: firstEvent.section?.id ?? `__ungrouped_${result.length}`,
            name: firstEvent.section?.name ?? "",
            description: firstEvent.section?.description ?? "",
            status: firstEvent.section?.status ?? "waiting",
            events: currentSlice,
            type: result.length === 0 ? "intro" : undefined,
            hasSection: Boolean(firstEvent.section?.id)
          });
        }

        // Start new slice with current event
        currentSlice = [event];
        currentSectionId = eventSectionId;
      } else {
        // Add event to current slice (same section)
        currentSlice.push(event);
      }
    }

    // Process the final slice
    if (currentSlice.length > 0) {
      const firstEvent = currentSlice[0];

      result.push({
        id: firstEvent.section?.id ?? `__ungrouped_${result.length}`,
        name: firstEvent.section?.name ?? "",
        description: firstEvent.section?.description ?? "",
        status: firstEvent.section?.status ?? "waiting",
        events: currentSlice,
        type: result.length === 0 ? "intro" : undefined,
        hasSection: Boolean(firstEvent.section?.id)
      });
    }

    // Mark the last section as summary if there are multiple sections
    if (result.length > 1) {
      result[result.length - 1].type = "summary";
    }

    return result;
  }, [agentEventsData]);

  return (
    <s.Container ref={elementRef} onScroll={handleElementScroll}>
      {!agentEventsData && isLoading && (
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      )}
      {agentEventsData && (
        <s.EventsContainer>
          {slices.map((slice, i) => (
            <Fragment key={slice.id}>
              {slice.hasSection ? (
                <AgentEventSection
                  data={slice}
                  typeInitialEvents={false}
                  index={i}
                />
              ) : (
                <AgentEventList
                  events={slice.events}
                  typeInitialEvents={false}
                />
              )}
            </Fragment>
          ))}
        </s.EventsContainer>
      )}
      {isAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
