import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "notifications";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded",
    LINK_CLICKED: "link clicked",
    VIEW_ALL_LINK_CLICKED: "view all link clicked"
  },
  " "
);
