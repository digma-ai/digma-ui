import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "assets";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    FILTER_APPLIED: "filter applied",
    REFRESH_BUTTON_CLICKED: "refresh button clicked",
    FILTERS_POPUP_CLOSE_BUTTON_CLICKED: "filter popup close button clicked",
    EMPTY_CATEGORY_PARENT_LINK_CLICKED: "parent link in empty category clicked"
  },
  " "
);
