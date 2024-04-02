import { actions } from "../../actions";

export const sendTrackingEvent = (
  eventName: string,
  data?: Record<string, unknown>
) => {
  window.sendMessageToDigma({
    action: actions.SEND_TRACKING_EVENT,
    payload: {
      ...(data ? { data } : {}),
      eventName
    }
  });
};
