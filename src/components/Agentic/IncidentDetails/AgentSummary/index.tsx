import { useMemo } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { useGetIncidentAgentsQuery } from "../../../../redux/services/digma";
import type {
  AgentStatus,
  IncidentAgentEvent
} from "../../../../redux/services/types";
import { groupBy } from "../../../../utils/groupBy";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { mockedAgentEvents } from "../../common/AgentEventList/mockData";
import { AgentEventSection } from "../../common/AgentEventSection";
import type { AgentEventSectionType } from "../../common/AgentEventSection/types";
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
  // const { elementRef, handleElementScroll } = useAutoScroll<HTMLDivElement>();

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

  const sections: {
    id: string;
    name: string;
    description: string;
    status: AgentStatus;
    events: IncidentAgentEvent[];
    type: AgentEventSectionType | undefined;
  }[] = useMemo(() => {
    return Object.entries(
      groupBy(agentEventsData, (event) => event.section?.id ?? "__ungrouped")
    ).map(([sectionId, sectionEvents], i) => ({
      id: sectionId,
      // TODO: get section metadata from corresponding API endpoint
      name: sectionEvents[0].section?.name ?? sectionId,
      description: sectionEvents[0].section?.description ?? "",
      status: sectionEvents[0].section?.status ?? "waiting",
      events: sectionEvents,
      type:
        i === 0
          ? "intro"
          : i === agentEventsData.length - 1
            ? "summary"
            : undefined
    }));
  }, [agentEventsData]);

  return (
    <s.Container>
      {!agentEventsData && isLoading && (
        <s.LoadingContainer>
          <Spinner size={32} />
        </s.LoadingContainer>
      )}
      {agentEventsData && (
        <s.EventsContainer>
          {sections.map((section, i) => (
            <AgentEventSection
              key={section.id}
              data={section}
              typeInitialEvents={false}
              index={i}
            />
          ))}
        </s.EventsContainer>
      )}
      {isAgentRunning && <ThreeCirclesSpinner />}
    </s.Container>
  );
};
