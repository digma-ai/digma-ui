import { addPrefix } from "../../../../utils/addPrefix";

const TRACKING_PREFIX = "issues";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    FILTER_OPTION_SELECTED: "filter option selected",
    CLEAR_ALL_FILTERS_BUTTON_CLICKED: "clear all filters button clicked"
  },
  " "
);
