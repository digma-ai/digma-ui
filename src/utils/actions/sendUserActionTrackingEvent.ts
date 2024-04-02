import { trackingEvents } from "../../trackingEvents";

export const sendUserActionTrackingEvent = (
  action: string,
  data?: Record<string, unknown>
) => {
  window.sendMessageToDigma({
    action: trackingEvents.USER_ACTION,
    payload: {
      action,
      ...(data ? { ...data } : {})
    }
  });
};
