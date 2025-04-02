import { isAxiosError } from "axios";
import { sendErrorTrackingEvent } from "./actions/sendErrorTrackingEvent";

export const reportError = (error: Error) => {
  if (isAxiosError(error)) {
    sendErrorTrackingEvent(error, {
      "request.url": error.config?.url,
      severity: "high",
      "error.source":
        error.response &&
        error.response.status >= 500 &&
        error.response.status < 600
          ? "backend"
          : "ui"
    });
  } else {
    sendErrorTrackingEvent(error, {
      severity: "high"
    });
  }
};
