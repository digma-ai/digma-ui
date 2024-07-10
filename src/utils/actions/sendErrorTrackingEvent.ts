import { trackingEvents } from "../../trackingEvents";
import { sendTrackingEvent } from "./sendTrackingEvent";

export interface ErrorData {
  severity: "low" | "medium" | "high";
  message?: string;
  action?: string;
  [key: string]: unknown;
}

export const sendErrorTrackingEvent = (error: Error, data: ErrorData) => {
  sendTrackingEvent(trackingEvents.ERROR, {
    ...(data ? { ...data } : {}),
    error: {
      source: "ui"
    },
    exception: {
      type: error.name,
      message: error.message,
      "stack-trace": error.stack
    },
    message: data.message ?? error.message
  });
};
