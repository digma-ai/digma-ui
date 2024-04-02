import { trackingEvents } from "../../trackingEvents";
import { sendTrackingEvent } from "./sendTrackingEvent";

export const sendUserActionTrackingEvent = (
  action: string,
  data?: Record<string, unknown>
) => {
  sendTrackingEvent(trackingEvents.USER_ACTION, {
    ...(data ? { ...data } : {}),
    action
  });
};
