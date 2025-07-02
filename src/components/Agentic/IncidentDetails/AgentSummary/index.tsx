import { useMemo } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentEventsQuery,
  useGetIncidentAgentsQuery
} from "../../../../redux/services/digma";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { AgentEventsList } from "../../common/AgentEventsList";
import { useAutoScroll } from "../useAutoScroll";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

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

  const { data: agentEventsData, isLoading } = useGetIncidentAgentEventsQuery(
    { incidentId: incidentId ?? "", agentId: agentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId || !agentId
    }
  );

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
        <AgentEventsList events={agentEventsData} typeInitialEvents={false} />
      )}
      {isAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
