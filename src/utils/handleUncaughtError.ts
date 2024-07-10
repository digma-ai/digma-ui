import { logger } from "../logging";
import { isString } from "../typeGuards/isString";
import { sendErrorTrackingEvent } from "./actions/sendErrorTrackingEvent";

export const handleUncaughtError = (
  app: string,
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) => {
  logger.error(event, source, lineno, colno, error);
  const err = error ?? new Error("Unknown error");
  const customMessage = isString(event) ? event : event.type;
  sendErrorTrackingEvent(err, {
    severity: "high",
    message: customMessage,
    level: "global",
    app
  });
};
