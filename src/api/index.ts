import { logger } from "../logging";
import { TaggedLogger } from "../logging/TaggedLogger";
import { platform } from "../platform";
import { isObject } from "../typeGuards/isObject";
import type { ActionDispatcher } from "./ActionDispatcher";
import { convertToDigmaJsonRpcRequest } from "./json-rpc/convertToDigmaJsonRpcRequest";
import { convertToDigmaMessageData } from "./json-rpc/convertToDigmaMessageData";
import { isDigmaJsonRpcRequest } from "./json-rpc/isDigmaJsonRpcRequest";
import type {
  DigmaIncomingMessageData,
  DigmaMessageEvent,
  DigmaOutgoingMessageData
} from "./types";
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
    let data: DigmaIncomingMessageData | undefined;

    if (isDigmaJsonRpcRequest(e)) {
      data = convertToDigmaMessageData(e.data);
    }

    if (isDigmaMessageEvent(e)) {
      data = e.data;
    }

    if (!data) {
      return;
    }

    messagingLogger.debug(
      `Message received: %c${data.action}
%cRaw message: %O`,
      INCOMING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
      null,
      data
    );
    dispatcher.dispatch(e.timeStamp, data.action, data.payload, data.error);
  };

  switch (platform) {
    case "Visual Studio":
      if (window.chrome?.webview) {
        window.chrome.webview.addEventListener("message", handleDigmaMessage);
      }
      break;
    case "JetBrains":
    case "Web":
      window.addEventListener("message", handleDigmaMessage);
      break;
  }

  return () => {
    switch (platform) {
      case "Visual Studio":
        if (window.chrome?.webview) {
          window.chrome.webview.removeEventListener(
            "message",
            handleDigmaMessage
          );
        }
        break;
      case "JetBrains":
      case "Web":
        window.removeEventListener("message", handleDigmaMessage);
        break;
    }
  };
};

export const sendMessage = <T>(
  message: DigmaOutgoingMessageData<T>
): string | undefined => {
  messagingLogger.debug(
    `Message to send: ${message.action}
Raw message: %O`,
    message
  );

  switch (platform) {
    case "Web":
      sendMessageToWebService(message);
      break;
    case "Visual Studio": {
      const jsonRpcMessage = convertToDigmaJsonRpcRequest(message);

      if (window.chrome?.webview) {
        window.chrome.webview?.postMessage(jsonRpcMessage);
        messagingLogger.debug(
          `Message has been successfully sent to Visual Studio: %c${jsonRpcMessage.method}
%cRaw message: %O`,
          OUTGOING_MESSAGE_ACTION_ID_CONSOLE_STYLE,
          null,
          jsonRpcMessage
        );
      }
      break;
    }
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
