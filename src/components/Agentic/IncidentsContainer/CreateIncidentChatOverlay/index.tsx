import { useState } from "react";
import { useNavigate } from "react-router";
import { useAgenticDispatch } from "../../../../containers/Agentic/hooks";
import {
  useGetIncidentAgentEventsQuery,
  useSendMessageToIncidentCreationChatMutation,
  useStartIncidentCreationChatMutation
} from "../../../../redux/services/digma";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { setIsCreateIncidentChatOpen } from "../../../../redux/slices/incidentsSlice";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

const AGENT_ID = "incident_entry";
const PROMPT_FONT_SIZE = 14; // in pixels
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const CreateIncidentChatOverlay = () => {
  const [incidentId, setIncidentId] = useState<string>();
  const [
    isCloseConfirmationDialogVisible,
    setIsCloseConfirmationDialogVisible
  ] = useState(false);
  const [accumulatedData, setAccumulatedData] =
    useState<IncidentAgentEvent[]>();
  const navigate = useNavigate();

  const dispatch = useAgenticDispatch();

  const [sendStartMessage, { isLoading: isStartMessageSending }] =
    useStartIncidentCreationChatMutation();

  const [sendMessage, { isLoading: isSubsequentMessageSending }] =
    useSendMessageToIncidentCreationChatMutation();

  const isMessageSending = isStartMessageSending || isSubsequentMessageSending;

  const { data, isLoading } = useGetIncidentAgentEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: AGENT_ID
    },
    {
      skip: !incidentId,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const handleCreateIncidentChatMessageSend = (text: string) => {
    // Send first message to start the incident creation chat
    if (!incidentId) {
      setAccumulatedData([
        {
          id: "__start_message",
          type: "human",
          agent_name: AGENT_ID,
          message: text,
          tool_name: null,
          mcp_name: null
        }
      ]);

      void sendStartMessage({ data: { text } })
        .unwrap()
        .then((response) => {
          setIncidentId(response.conversation_id);
        });
    } else {
      // Send subsequent messages to the incident creation chat
      void sendMessage({
        incidentId,
        data: { text }
      });
    }
  };

  const handleIncidentNavigate = () => {
    if (!incidentId) {
      return;
    }

    dispatch(setIsCreateIncidentChatOpen(false));
    void navigate(`/incidents/${incidentId}`);
  };

  const handleCreateIncidentChatDialogClose = () => {
    setIsCloseConfirmationDialogVisible(true);
  };

  const handleCloseConfirmationDialogClose = () => {
    setIsCloseConfirmationDialogVisible(false);
  };

  const handleCloseConfirmationDialogConfirm = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_CREATION_CHAT_DIALOG_CLOSED
    );
    setIsCloseConfirmationDialogVisible(false);
    dispatch(setIsCreateIncidentChatOpen(false));
  };

  return (
    <>
      <s.StyledOverlay>
        <s.StyledDialog
          onClose={handleCreateIncidentChatDialogClose}
          title={"Add new incident"}
        >
          <s.StyledAgentChat
            agentId={AGENT_ID}
            data={data && data.length > 0 ? data : accumulatedData}
            isDataLoading={isLoading}
            onMessageSend={handleCreateIncidentChatMessageSend}
            isMessageSending={isMessageSending}
            promptFontSize={PROMPT_FONT_SIZE}
            onNavigateToIncident={handleIncidentNavigate}
            typeInitialMessages={true}
          />
        </s.StyledDialog>
      </s.StyledOverlay>
      {isCloseConfirmationDialogVisible && (
        <s.StyledOverlay>
          <CancelConfirmation
            header={"Close incident creation chat?"}
            description={
              "Are you sure that you want to stop creating the new incident?"
            }
            confirmBtnText={"Yes, close"}
            onClose={handleCloseConfirmationDialogClose}
            onConfirm={handleCloseConfirmationDialogConfirm}
          />
        </s.StyledOverlay>
      )}
    </>
  );
};
