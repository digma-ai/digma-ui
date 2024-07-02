import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "troubleshooting";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded",
    RUN_OPTION_BUTTON_CLICKED: "run option button clicked",
    CLOSE_BUTTON_CLICKED: "close button clicked",
    SLACK_LINK_CLICKED: "slack link clicked"
  },
  " "
);
