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
    "error.source": "ui",
    ...data,
    "exception.type": error.name,
    "exception.message": error.message,
    "exception.stack-trace": error.stack,
    message: data.message ?? error.message
  });
};
