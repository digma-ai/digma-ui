import { DigmaOutgoingMessageData } from "./api/types";

export {};

export type Platform = "JetBrains" | "VS Code" | "Web";

export type IDE = "IDEA" | "Rider" | "PyCharm";

export type Theme = "light" | "dark" | "dark-jetbrains";

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
    assetsRefreshInterval?: unknown;
    dashboardEnvironment?: unknown;
    dashboardRefreshInterval?: unknown;
    documentationPage?: unknown;
    insightsRefreshInterval?: unknown;
    notificationsRefreshInterval?: unknown;
    notificationsViewMode?: unknown;
    recentActivityExpirationLimit?: unknown;
    recentActivityDocumentationURL?: unknown;
    testsRefreshInterval?: unknown;
    wizardSkipInstallationStep?: unknown;
    wizardFirstLaunch?: unknown;
    productKey?: unknown;
    isDigmathonModeEnabled?: unknown;
    userId?: unknown;
    isDigmathonGameFinished?: unknown;
    isLoggingEnabled?: unknown;
  }
}

export interface Duration {
  value: number;
  unit: string;
  raw: number;
}
