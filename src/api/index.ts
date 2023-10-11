import { platform } from "../platform";
import { isObject } from "../typeGuards/isObject";
import { ActionDispatcher } from "./ActionDispatcher";
import { DigmaMessageEvent, DigmaOutgoingMessageData } from "./types";
import { sendMessageToWebService } from "./web/sendMessageToWebService";

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === "digma";

export const initializeDigmaMessageListener = (
  dispatcher: ActionDispatcher
) => {
  window.addEventListener("message", (e) => {
    if (isDigmaMessageEvent(e)) {
      console.debug("Digma message received: ", e);
      dispatcher.dispatch(e.timeStamp, e.data.action, e.data.payload);
    }
  });
};

export const sendMessage = (
  message: DigmaOutgoingMessageData
): string | undefined => {
  console.debug("Message to send:", message);

  switch (platform) {
    case "Web":
      sendMessageToWebService(message);
      break;
    case "VS Code":
      if (window.sendMessageToVSCode) {
        window.sendMessageToVSCode(message);
        console.debug("Message has been sent to VS Code: ", message);
      }
      break;
    case "JetBrains":
      if (window.cefQuery) {
        return window.cefQuery({
          request: JSON.stringify(message),
          onSuccess: function (response) {
            console.debug("cefQuery has been successfully sent: %s", response);
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
      break;
  }
};

export const cancelMessage = (messageId: string) => {
  if (window.cefQueryCancel) {
    window.cefQueryCancel(messageId);
  }
};
