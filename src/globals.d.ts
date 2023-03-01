export {};

export type Environment = "JetBrains" | "VS Code" | "Other";
export type Mode = "light" | "dark" | "dark-jetbrains";

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
    theme?: Mode;
    environment?: Environment;
    mainFont?: string;
    codeFont?: string;
    recentActivityRefreshInterval?: number;
    recentActivityExpirationLimit?: number;
    recentActivityDocumentationURL?: string;
  }
}
