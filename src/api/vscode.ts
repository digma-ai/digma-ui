/* eslint-disable */
// @ts-nocheck

interface DigmaMessageEvent extends MessageEvent {
  data: {
    type: "digma";
    action: string;
    payload: unknown;
  };
}

export const initializeDigmaMessageListener = () => {
  window.addEventListener("message", (e) => {
    if (e.data.type === "digma") {
      console.log("Digma message received: ", e);
    }
  });
};

export const sendMessage = (message: any) => {
  if (window.vscode) {
    window.vscode.postMessage(message);
  }

  if (window.cefQuery) {
    window.cefQuery({
      request: message,
      onSuccess: (response) => {
        console.info("cefQuery has been successfully sent: %s", response);
      },
      onFailure: (error_code, error_message) => {
        console.error(
          "Failed to send cefQuery: %d, %s",
          error_code,
          error_message
        );
      }
    });
  }
};
