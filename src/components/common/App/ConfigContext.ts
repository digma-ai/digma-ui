import { createContext } from "react";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isString } from "../../../typeGuards/isString";
import type { ConfigContextData } from "./types";

export const initialState: ConfigContextData = {
  digmaApiUrl: isString(window.digmaApiUrl) ? window.digmaApiUrl : "",
  digmaApiProxyPrefix: isString(window.digmaApiProxyPrefix)
    ? window.digmaApiProxyPrefix
    : "",
  digmaStatus: undefined,
  isObservabilityEnabled: window.isObservabilityEnabled === true,
  jaegerURL: isString(window.jaegerURL) ? window.jaegerURL : "",
  isJaegerEnabled: window.isJaegerEnabled === true,
  isDigmaEngineInstalled: window.isDigmaEngineInstalled === true,
  isDigmaEngineRunning: window.isDigmaEngineRunning === true,
  isDockerInstalled: window.isDockerInstalled === true,
  isDockerComposeInstalled: window.isDockerComposeInstalled === true,
  userEmail: isString(window.userEmail) ? window.userEmail : "",
  userRegistrationEmail: isString(window.userRegistrationEmail)
    ? window.userRegistrationEmail
    : "",
  environment: isEnvironment(window.environment)
    ? window.environment
    : undefined,
  backendInfo: undefined,
  environments: undefined,
  scope: undefined,
  isMicrometerProject: window.isMicrometerProject === true,
  state: undefined,
  insightStats: undefined,
  productKey: isString(window.productKey) ? window.productKey : "",
  isDigmathonModeEnabled: window.isDigmathonModeEnabled === true,
  userId: isString(window.userId) ? window.userId : "",
  isDigmathonGameFinished: window.isDigmathonGameFinished === true,
  runConfig: undefined
};

export const ConfigContext = createContext<ConfigContextData>(initialState);
