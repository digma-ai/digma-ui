import { Environment } from "./globals";

const ENVIRONMENTS = ["JetBrains", "VS Code", "Other"];

const isEnvironment = (environment: unknown): environment is Environment =>
  typeof environment === "string" && ENVIRONMENTS.includes(environment);

export const getEnvironment = (): Environment =>
  isEnvironment(window.environment) ? window.environment : "Other";

export const environment = getEnvironment();
