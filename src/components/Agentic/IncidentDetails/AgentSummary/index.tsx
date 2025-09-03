import { useMemo } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { useGetIncidentAgentsQuery } from "../../../../redux/services/digma";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { AgentEventList } from "../../common/AgentEventList";
import { mockedAgentEvents } from "../../common/AgentEventList/mockData";
import { useAutoScroll } from "../useAutoScroll";
import * as s from "./styles";

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

  return (
    <s.Container ref={elementRef} onScroll={handleElementScroll}>
      {!agentEventsData && isLoading && (
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      )}
      {agentEventsData && (
        <s.EventsContainer>
          {agentEventsData && (
            <AgentEventList
              events={agentEventsData}
              typeInitialEvents={false}
            />
          )}
        </s.EventsContainer>
      )}
      {isAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
