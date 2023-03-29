import { isObject } from "../typeGuards/isObject";
import { ActionDispatcher } from "./ActionDispatcher";
import { DigmaMessageEvent, DigmaOutgoingMessageData } from "./types";

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === "digma";

export const initializeDigmaMessageListener = (
  dispatcher: ActionDispatcher
) => {
  window.addEventListener("message", (e) => {
    if (isDigmaMessageEvent(e)) {
      console.info("Digma message received: ", e);
      dispatcher.dispatch(e.data.action, e.data.payload);
    }
  });
};

export const sendMessage = (
  message: DigmaOutgoingMessageData
): string | undefined => {
  if (window.sendMessageToVSCode) {
    window.sendMessageToVSCode(message);
    console.info("Message has been sent to VS Code: ", message);
  }

  if (window.cefQuery) {
    return window.cefQuery({
      request: JSON.stringify(message),
      onSuccess: function (response) {
        console.info("cefQuery has been successfully sent: %s", response);
      },
      onFailure: function (error_code, error_message) {
        console.error(
          "Failed to send cefQuery: %d, %s",
          error_code,
          error_message
        );
      }
    });
  }
};

export const cancelMessage = (messageId: string) => {
  if (window.cefQueryCancel) {
    window.cefQueryCancel(messageId);
  }
};
