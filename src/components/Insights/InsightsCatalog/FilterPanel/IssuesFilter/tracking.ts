import { addPrefix } from "../../../../../utils/addPrefix";

const TRACKING_PREFIX = "issues";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    FILTER_OPTION_SELECTED: "filter option selected",
    APPLY_FILTERS_BUTTON_CLICKED: "apply filters button clicked",
    CLEAR_ALL_FILTERS_BUTTON_CLICKED: "clear all filters button clicked",
    CLOSE_FILTER_DIALOG_CLICKED: "close filter dialog clicked",
    FILTERS_BUTTON_CLICKED: "filters button clicked"
  },
  " "
);
