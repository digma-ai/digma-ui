import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { useSendMessageToIncidentAgentChatMutation } from "../../../../redux/services/digma";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { AgentChat } from "../../common/AgentChat";
import { trackingEvents } from "../../tracking";

export const IncidentAgentChat = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");

  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageToIncidentAgentChatMutation();

  const handleMessageSend = (text: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_MESSAGE_SUBMITTED,
      {
        agentName: agentId ?? ""
      }
    );

    void sendMessage({
      incidentId: incidentId ?? "",
      agentId: agentId ?? "",
      data: { text }
    });
  };

  return (
    <AgentChat
      incidentId={incidentId}
      agentId={agentId ?? ""}
      onMessageSend={handleMessageSend}
      isMessageSending={isMessageSending}
    />
  );
};
