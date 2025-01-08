import { platform } from "../../platform";
import { trackingEvents } from "../../trackingEvents";
import { sendTrackingEvent } from "./sendTrackingEvent";

export const sendUserActionTrackingEvent = (
  action: string,
  data?: Record<string, unknown>
) => {
  if (platform === "Web") {
    // TODO: implement
    return;
  }

  sendTrackingEvent(trackingEvents.USER_ACTION, {
    ...(data ? { ...data } : {}),
    action
  });
};
