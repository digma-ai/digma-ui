import type { DigmaOutgoingMessageData } from "./api/types";
import type { HistoryEntry } from "./history/History";

export {};

export type Platform = "JetBrains" | "VS Code" | "Web" | "Visual Studio";

export type IDE = "IDEA" | "Rider" | "PyCharm";

export type Theme = "light" | "dark" | "dark-jetbrains";

declare global {
  interface WindowEventMap extends CustomEventMap {
    "history:navigate": CustomEvent<HistoryEntry<unknown>>;
    "history:change": CustomEvent<HistoryEntry<unknown>>;
    "history:clear": CustomEvent<void>;
  }
  interface Window {
    sendMessageToVSCode?: (message) => void;
    cefQuery?: (query: {
      request: string;
      persistent?: boolean;
      onSuccess: (response) => void;
      onFailure: (error_code, error_message) => void;
    }) => string;
    cefQueryCancel?: (request_id: string) => void;
    chrome?: {
      webview?: {
        addEventListener: typeof window.addEventListener;
        removeEventListener: typeof window.removeEventListener;
        postMessage: typeof window.postMessage;
      };
    };
    sendMessageToDigma: <T>(
      message: DigmaOutgoingMessageData<T>
    ) => string | undefined;
    cancelMessageToDigma: (request_id: string) => void;
    digmaApiUrl?: unknown;
    digmaApiProxyPrefix?: unknown;
    theme?: unknown;
    platform?: unknown;
    ide?: unknown;
    mainFont?: unknown;
    codeFont?: unknown;
    jaegerURL?: unknown;
    jaegerApiPath?: unknown;
    isJaegerEnabled?: unknown;
    userEmail?: unknown;
    userRegistrationEmail?: unknown;
    environment?: unknown;
    isObservabilityEnabled?: unknown;
    isDigmaEngineInstalled?: unknown;
    isDigmaEngineRunning?: unknown;
    isDockerInstalled?: unknown;
    isDockerComposeInstalled?: unknown;
    isMicrometerProject?: unknown;
    dashboardEnvironment?: unknown;
    documentationPage?: unknown;
    initialRoutePath?: unknown;
    notificationsViewMode?: unknown;
    recentActivityExpirationLimit?: unknown;
    wizardSkipInstallationStep?: unknown;
    wizardFirstLaunch?: unknown;
    productKey?: unknown;
    isDigmathonModeEnabled?: unknown;
    userId?: unknown;
    isDigmathonGameFinished?: unknown;
    isLoggingEnabled?: unknown;
    areInsightSuggestionsEnabled?: unknown;
    isAgenticEnabled?: unknown;
    googleClientId?: unknown;
    isSandboxModeEnabled?: unknown;
    postHogApiKey?: unknown;
    postHogHost?: unknown;
    productFruitsWorkspaceCode?: unknown;
  }
}
