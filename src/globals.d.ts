export {};

declare global {
  interface Window {
    sendMessageToVSCode: (message) => void;
    cefQuery: (query: {
      request: string;
      persistent?: boolean;
      onSuccess: (response) => void;
      onFailure: (error_code, error_message) => void;
    }) => string;
    cefQueryCancel: (request_id: string) => void;
    sendMessageToDigma: (message: any) => string | undefined;
    cancelMessageToDigma: (request_id: string) => void;
  }
}
