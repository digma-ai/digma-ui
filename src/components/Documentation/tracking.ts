import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "documentation";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded"
  },
  " "
);
