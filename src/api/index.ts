import { logger } from "../logging";
import { TaggedLogger } from "../logging/TaggedLogger";
import { platform } from "../platform";
import { isObject } from "../typeGuards/isObject";
import { ActionDispatcher } from "./ActionDispatcher";
import { DigmaMessageEvent, DigmaOutgoingMessageData } from "./types";
import { sendMessageToWebService } from "./web/sendMessageToWebService";

const messagingLogger = new TaggedLogger(logger, "MESSAGING");

const isDigmaMessageEvent = (e: MessageEvent): e is DigmaMessageEvent =>
  isObject(e.data) && e.data.type === "digma";

const OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE =
  "color: blue; font-weight: bold";
const FAILED_OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE =
  "color: red; font-weight: bold";
const INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE =
  "color: green; font-weight: bold";

export const initializeDigmaMessageListener = (
  dispatcher: ActionDispatcher
) => {
  const handleDigmaMessage = (e: MessageEvent) => {
    if (isDigmaMessageEvent(e)) {
      messagingLogger.debug(
        `Message received: %c${e.data.action}
%cRaw message: %O`,
        INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
        null,
        e.data
      );
      dispatcher.dispatch(e.timeStamp, e.data.action, e.data.payload);
    }
  };

  window.addEventListener("message", handleDigmaMessage);

  return () => {
    window.removeEventListener("message", handleDigmaMessage);
  };
};

export const sendMessage = <T>(
  message: DigmaOutgoingMessageData<T>
): string | undefined => {
  messagingLogger.debug(
    `Message to sent: ${message.action}
Raw message: %O`,
    message
  );

  switch (platform) {
    case "Web":
      sendMessageToWebService(message);
      break;
    case "VS Code":
      if (window.sendMessageToVSCode) {
        window.sendMessageToVSCode(message);
        messagingLogger.debug(
          `Message has been successfully sent to VS Code: %c${message.action}
%cRaw message: %O`,
          OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
          null,
          message
        );
      }
      break;
    case "JetBrains":
      if (window.cefQuery) {
        return window.cefQuery({
          request: JSON.stringify(message),
          onSuccess: function (response) {
            messagingLogger.debug(
              `Message has been successfully handled by JCEF: %c${message.action}
%cRaw message: %O
Response: %O`,
              OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
              null,
              message,
              response
            );
          },
          onFailure: function (error_code: number, error_message: string) {
            messagingLogger.error(
              `Failed to handle the message by JCEF: %c${message.action}
%cRaw message: %O
%cError code: %d
Error message: %s`,
              FAILED_OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
              null,
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
