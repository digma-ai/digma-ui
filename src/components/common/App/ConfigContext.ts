import { createContext } from "react";
import { isString } from "../../../typeGuards/isString";

export const ConfigContext = createContext({
  isObservabilityEnabled: window.isObservabilityEnabled === true,
  isJaegerEnabled: window.isJaegerEnabled === true,
  isDigmaEngineInstalled: window.isDigmaEngineInstalled === true,
  isDigmaEngineRunning: window.isDigmaEngineRunning === true,
  isDigmaRunning: window.isDigmaRunning === true,
  isDockerInstalled: window.isDockerInstalled === true,
  isDockerComposeInstalled: window.isDockerComposeInstalled === true,
  userEmail: isString(window.userEmail) ? window.userEmail : ""
});
