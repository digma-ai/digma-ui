import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "assets";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    FILTER_APPLIED: "filter applied",
    REFRESH_BUTTON_CLICKED: "refresh button clicked",
    FILTERS_POPUP_CLOSE_BUTTON_CLICKED: "filter popup close button clicked",
    FILTERS_POPUP_APPLY_FILTERS_BUTTON_CLICKED:
      "filter popup apply filters button clicked",
    ALL_ASSETS_LINK_CLICKED: "all assets link clicked",
    FILTERS_BUTTON_CLICKED: "filters button clicked",
    CLEAR_FILTERS_BUTTON_CLICKED: "clear filters button clicked"
  },
  " "
);
