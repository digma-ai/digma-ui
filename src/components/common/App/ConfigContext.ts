import { createContext } from "react";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isNull } from "../../../typeGuards/isNull";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { DigmaStatus } from "./types";

export const isDigmaStatus = (status: unknown): status is DigmaStatus =>
  isObject(status) &&
  isBoolean(status.isRunning) &&
  (isString(status.type) || isNull(status.type));

export const ConfigContext = createContext({
  isObservabilityEnabled: window.isObservabilityEnabled === true,
  isJaegerEnabled: window.isJaegerEnabled === true,
  isDigmaEngineInstalled: window.isDigmaEngineInstalled === true,
  isDigmaEngineRunning: window.isDigmaEngineRunning === true,
  digmaStatus: isDigmaStatus(window.digmaStatus)
    ? window.digmaStatus
    : undefined,
  isDockerInstalled: window.isDockerInstalled === true,
  isDockerComposeInstalled: window.isDockerComposeInstalled === true,
  userEmail: isString(window.userEmail) ? window.userEmail : ""
});
