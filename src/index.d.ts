export {};

declare global {
  interface Window {
    vsCode: {
      postMessage: (message) => void;
    };
    cefQuery: (query: {
      request: any;
      onSuccess: (response) => void;
      onFailure: (error_code, error_message) => void;
    }) => void;
  }
}
