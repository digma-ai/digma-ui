import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "errors";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    ERROR_CARD_CLICKED: "error card clicked",
    BACK_BUTTON_CLICKED: "back button clicked",
    FLOW_PAGINATION_BUTTON_CLICKED: "flow pagination button clicked",
    TRACE_BUTTON_CLICKED: "trace button clicked",
    ERROR_STACK_TRACE_ITEM_CLICKED: "error stack trace item clicked",
    RAW_ERROR_STACK_TRACE_BUTTON_CLICKED:
      "raw error stack trace button clicked",
    WORKSPACE_ONLY_TOGGLE_SWITCHED: "workspace only toggle switched",
    GLOBAL_ERRORS_VIEW_SEARCH_CHANGED: "global errors view search changed",
    GLOBAL_ERRORS_VIEW_SORTING_CHANGE: "global errors view sorting change",
    GLOBAL_ERRORS_VIEW_PAGE_CHANGE: "global errors view page change",
    GLOBAL_ERRORS_VIEW_RESET_FILTERS_BUTTON_CLICKED:
      "global errors view reset filters button clicked",
    ERROR_CARD_SOURCE_LINK_CLICKED: "error card source link clicked",
    ERROR_CARD_SELECTED_AFFECTED_ENDPOINT_CHANGED:
      "error card selected affected endpoint changed",
    ERROR_CARD_AFFECTED_ENDPOINT_LINK_CLICKED:
      "error card affected endpoint link clicked"
  },
  " "
);
