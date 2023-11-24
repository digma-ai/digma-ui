import { createContext } from "react";
import { isString } from "../../../typeGuards/isString";
import { ConfigContextData } from "./types";

export const ConfigContext = createContext<ConfigContextData>({
  digmaApiUrl: isString(window.digmaApiUrl) ? window.digmaApiUrl : "",
  digmaStatus: undefined,
  isObservabilityEnabled: window.isObservabilityEnabled === true,
  isJaegerEnabled: window.isJaegerEnabled === true,
  isDigmaEngineInstalled: window.isDigmaEngineInstalled === true,
  isDigmaEngineRunning: window.isDigmaEngineRunning === true,
  isDockerInstalled: window.isDockerInstalled === true,
  isDockerComposeInstalled: window.isDockerComposeInstalled === true,
  userEmail: isString(window.userEmail) ? window.userEmail : "",
  environment: isString(window.environment) ? window.environment : "",
  backendInfo: undefined
});
