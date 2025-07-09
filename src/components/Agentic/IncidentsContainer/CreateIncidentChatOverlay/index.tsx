import {
  fetchEventSource,
  type EventSourceMessage
} from "@microsoft/fetch-event-source";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAgenticDispatch } from "../../../../containers/Agentic/hooks";
import {
  useGetIncidentAgentEventsQuery,
  useSendMessageToIncidentCreationChatMutation
} from "../../../../redux/services/digma";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { setIsCreateIncidentChatOpen } from "../../../../redux/slices/incidentsSlice";
import { isString } from "../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

const AGENT_ID = "incident_entry";
const PROMPT_FONT_SIZE = 14; // in pixels
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const REFRESH_INTERVAL_DURING_STREAMING = 3 * 1000; // in milliseconds

export const CreateIncidentChatOverlay = () => {
  const [incidentId, setIncidentId] = useState<string>();
  const [
    isCloseConfirmationDialogVisible,
    setIsCloseConfirmationDialogVisible
  ] = useState(false);
  const [isStartMessageSending, setIsStartMessageSending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [accumulatedData, setAccumulatedData] =
    useState<IncidentAgentEvent[]>();
  const navigate = useNavigate();

  const dispatch = useAgenticDispatch();

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
      pollingInterval: isMessageSending
        ? REFRESH_INTERVAL_DURING_STREAMING
        : REFRESH_INTERVAL
    }
  );

  const handleCreateIncidentChatMessageSend = (text: string) => {
    // Send first message to start the incident creation chat
    if (!incidentId) {
      setAccumulatedData([
        {
          id: "__start_message",
          type: "human",
          agent_name: "incident_entry",
          message: text,
          tool_name: null,
          mcp_name: null
        }
      ]);
      // Stop any existing connection
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsStartMessageSending(true);
      void fetchEventSource(
        `${
          isString(window.digmaApiProxyPrefix)
            ? window.digmaApiProxyPrefix
            : "/api/"
        }Agentic/incident-entry`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          signal: abortControllerRef.current.signal,
          body: JSON.stringify({
            text
          }),
          openWhenHidden: true,
          onopen: (response: Response) => {
            if (response.ok) {
              setIncidentId(
                response.headers.get("agentic-conversation-id") ?? ""
              );
              // eslint-disable-next-line no-console
              console.log(
                `[${new Date().toISOString()}] Got conversation ID:`,
                response.headers.get("agentic-conversation-id") ?? ""
              );
              setIsStartMessageSending(false);
              return Promise.resolve();
            } else {
              setIsStartMessageSending(false);
              return Promise.reject(
                new Error(`HTTP ${response.status}: ${response.statusText}`)
              );
            }
          },
          onmessage: (message: EventSourceMessage) => {
            // eslint-disable-next-line no-console
            console.log(
              `[${new Date().toISOString()}] Received message:`,
              message
            );
            // if (message.data) {
            //   try {
            //     const parsedData = JSON.parse(
            //       message.data
            //     ) as IncidentAgentEvent;
            //     if (["human", "token"].includes(parsedData.type)) {
            //       setAccumulatedData((prev) =>
            //         prev ? [...prev, parsedData] : [parsedData]
            //       );
            //     }
            //     if (parsedData.type === "input_user_required") {
            //       setIsStartMessageSending(false);
            //     }
            //   } catch (error) {
            //     // eslint-disable-next-line no-console
            //     console.error("Error parsing message data:", error);
            //   }
            // }
          },
          onerror: (err: unknown) => {
            abortControllerRef.current = null;
            setIsStartMessageSending(false);
            let errorMessage = "Unknown error starting incident creation chat";
            if (err instanceof Error) {
              errorMessage = err.message;
            }

            // eslint-disable-next-line no-console
            console.error(errorMessage);

            throw new Error(errorMessage); // Rethrow the error to avoid retrying
          },
          onclose: () => {
            abortControllerRef.current = null;
          }
        }
      );
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

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
