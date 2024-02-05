import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "assets";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    FILTER_APPLIED: "filter applied"
  },
  " "
);
