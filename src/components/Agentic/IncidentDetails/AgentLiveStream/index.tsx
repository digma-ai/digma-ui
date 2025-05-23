import { Fragment } from "react/jsx-runtime";
import { useAgenticSelector } from "../../../../containers/Agentic/hooks";
import { useGetIncidentAgentLiveStreamQuery } from "../../../../redux/services/digma";
import { Spinner } from "../../../common/v3/Spinner";
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

export const AgentLiveStream = () => {
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const agentId = useAgenticSelector((state) => state.incidents.agentId);

  const { data, isLoading } = useGetIncidentAgentLiveStreamQuery(
    { incidentId: incidentId ?? "", agentId: agentId ?? "" },
    {
      pollingInterval: REFRESH_INTERVAL,
      skip: !incidentId || !agentId
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <s.Container>
      {data?.map((x, i) => (
        <Fragment key={i}>
          {x.type === "tool" ? (
            <details key={i}>
              <summary>{x.name} (tool)</summary>
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
