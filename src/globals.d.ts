export {};

export type Environment = "JetBrains" | "VS Code" | "Other";

export type Mode = "light" | "dark" | "dark-jetbrains";

declare global {
  interface Window {
    sendMessageToVSCode?: (message) => void;
    cefQuery?: (query: {
      request: string;
      persistent?: boolean;
      onSuccess: (response) => void;
      onFailure: (error_code, error_message) => void;
    }) => string;
    cefQueryCancel?: (request_id: string) => void;
    sendMessageToDigma: (message: any) => string | undefined;
    cancelMessageToDigma: (request_id: string) => void;
    theme?: unknown;
    environment?: unknown;
    mainFont?: unknown;
    codeFont?: unknown;
    recentActivityRefreshInterval?: unknown;
    recentActivityExpirationLimit?: unknown;
    recentActivityDocumentationURL?: unknown;
    assetsRefreshInterval?: unknown;
  }
}

export interface Duration {
  value: number;
  unit: string;
  raw: number;
}
