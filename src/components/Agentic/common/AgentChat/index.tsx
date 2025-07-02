import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Chat } from "../../common/Chat";
import { trackingEvents } from "../../tracking";
import { AgentEventsList } from "../AgentEventsList";
import type { AgentChatProps } from "./types";

export const AgentChat = ({
  agentId,
  onMessageSend,
  isMessageSending,
  className,
  data,
  isDataLoading,
  onNavigateToIncident,
  attachmentsComponent,
  typeInitialMessages,
  conversationId
}: AgentChatProps) => {
  const handleMessageSend = (text: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_AGENT_MESSAGE_SUBMITTED,
      {
        agentName: agentId ?? ""
      }
    );

    onMessageSend(text);
  };

  const handleNavigateToIncident = () => {
    onNavigateToIncident?.();
  };

  return (
    <Chat
      attachmentsComponent={attachmentsComponent}
      isInitialLoading={!data && isDataLoading}
      isMessageSending={isMessageSending}
      onMessageSend={handleMessageSend}
      className={className}
      promptFontSize={14}
      chatContent={
        <>
          {data && (
            <AgentEventsList
              key={conversationId}
              events={data}
              typeInitialEvents={typeInitialMessages}
              onNavigateToIncident={handleNavigateToIncident}
            />
          )}
        </>
      }
    />
  );
};
