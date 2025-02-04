import { actions } from "../../actions";
import { platform } from "../../platform";
import posthog from "../../posthog";

export const sendTrackingEvent = (
  eventName: string,
  data?: Record<string, unknown>
) => {
  if (platform === "Web" && posthog?.__loaded) {
    posthog.capture(eventName, data);
    return;
  }

  window.sendMessageToDigma({
    action: actions.SEND_TRACKING_EVENT,
    payload: {
      ...(data ? { data } : {}),
      eventName
    }
  });
};
