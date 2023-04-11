import { DigmaOutgoingMessageData } from "./api/types";

export {};

export type Platform = "JetBrains" | "VS Code" | "Other";

export type IDE = "IntelliJ IDEA" | "Rider" | "PyCharm";

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
    sendMessageToDigma: (
      message: DigmaOutgoingMessageData
    ) => string | undefined;
    cancelMessageToDigma: (request_id: string) => void;
    theme?: unknown;
    platform?: unknown;
    ide?: unknown;
    mainFont?: unknown;
    codeFont?: unknown;
    isJaegerEnabled?: unknown;
    recentActivityRefreshInterval?: unknown;
    recentActivityExpirationLimit?: unknown;
    recentActivityDocumentationURL?: unknown;
    wizardSkipInstallationStep?: unknown;
    assetsRefreshInterval?: unknown;
  }
}

export interface Duration {
  value: number;
  unit: string;
  raw: number;
}
