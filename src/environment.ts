import { Environment } from "./globals";

export const getEnvironment = (): Environment =>
  typeof window.environment === "string" &&
  ["JetBrains", "VS Code", "Other"].includes(window.environment)
    ? window.environment
    : "Other";

export const environment = getEnvironment();
