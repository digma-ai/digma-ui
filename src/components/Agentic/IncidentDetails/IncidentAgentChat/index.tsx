import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentChatEventsQuery,
  useSendMessageToIncidentAgentChatMutation
} from "../../../../redux/services/digma";
import { AgentChat } from "../../common/AgentChat";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const REFRESH_INTERVAL_DURING_STREAMING = 3 * 1000; // in milliseconds

export const IncidentAgentChat = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");

  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageToIncidentAgentChatMutation();

  const handleMessageSend = (text: string) => {
    void sendMessage({
      incidentId: incidentId ?? "",
      agentId: agentId ?? "",
      data: { text }
    });
  };

  const { data, isLoading } = useGetIncidentAgentChatEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: agentId ?? ""
    },
    {
      skip: !incidentId || !agentId,
      pollingInterval: isMessageSending
        ? REFRESH_INTERVAL_DURING_STREAMING
        : REFRESH_INTERVAL
    }
  );

  return (
    <AgentChat
      data={data}
      isDataLoading={isLoading}
      incidentId={incidentId}
      agentId={agentId ?? ""}
      onMessageSend={handleMessageSend}
      isMessageSending={isMessageSending}
    />
  );
};
