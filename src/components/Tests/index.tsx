import { useEffect } from "react";
import { addPrefix } from "../../utils/addPrefix";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import * as s from "./styles";

const ACTION_PREFIX = "TESTS";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE"
});

const TRACKING_PREFIX = "tests";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded"
  },
  " "
);

export const Tests = () => {
  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);
  }, []);

  return <s.Container>Tests</s.Container>;
};
