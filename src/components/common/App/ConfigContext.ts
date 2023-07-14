import { createContext } from "react";
import { isString } from "../../../typeGuards/isString";

export const ConfigContext = createContext({
  isObservabilityEnabled: window.isObservabilityEnabled === true,
  isJaegerEnabled: window.isJaegerEnabled === true,
  isDigmaInstalled: window.isDigmaInstalled === true,
  isDigmaRunning: window.isDigmaRunning === true,
  userEmail: isString(window.userEmail) ? window.userEmail : ""
});
