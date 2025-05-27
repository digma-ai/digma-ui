import { Fragment } from "react/jsx-runtime";
import { useAgenticSelector } from "../../../../containers/Agentic/hooks";
import { useGetIncidentAgentEventsQuery } from "../../../../redux/services/digma";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getMessage = (message: string) => {
  try {
    const parsedMessage: unknown = JSON.parse(message);
    return JSON.stringify(parsedMessage, null, 2);
  } catch {
    return message;
  }
};

export const AgentEvents = () => {
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const agentId = useAgenticSelector((state) => state.incidents.agentId);

  const { data, isLoading } = useGetIncidentAgentEventsQuery(
    { incidentId: incidentId ?? "", agentId: agentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId || !agentId
    }
  );

  if (isLoading) {
    return <ThreeCirclesSpinner />;
  }

  return (
    <s.Container>
      {data?.map((x, i) => (
        <Fragment key={i}>
          {x.type === "tool" ? (
            <details key={i}>
              <summary>
                {x.mcp_name} {x.tool_name}
              </summary>
              <s.Message>{getMessage(x.message)}</s.Message>
            </details>
          ) : (
            <s.Message>{x.message}</s.Message>
          )}
        </Fragment>
      ))}
    </s.Container>
  );
};
