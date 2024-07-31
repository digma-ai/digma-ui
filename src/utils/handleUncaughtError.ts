import { logger } from "../logging";
import { isObject } from "../typeGuards/isObject";
import { sendErrorTrackingEvent } from "./actions/sendErrorTrackingEvent";

export const handleUncaughtError = (app: string, event: ErrorEvent) => {
  const { message, filename, lineno, colno } = event;
  logger.error(message, filename, lineno, colno, event.error);

  let err: Error;
  let customMessage: string | undefined = undefined;

  if (event.error instanceof Error) {
    err = event.error;
  } else {
    err = new Error(event.message);
    err.stack = `${message} (${filename}:${lineno}:${colno})`;
    customMessage = `Original error: ${
      isObject(event.error) ? JSON.stringify(event.error) : String(event.error)
    }`;
  }

  sendErrorTrackingEvent(err, {
    severity: "high",
    message: customMessage,
    level: "global",
    app
  });
};
