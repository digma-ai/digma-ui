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
    GLOBAL_ERRORS_VIEW_DATES_FILTERS_CHANGE:
      "global errors view date filters change",
    GLOBAL_ERRORS_VIEW_PAGE_CHANGE: "global errors view page change",
    GLOBAL_ERRORS_DAYS_FILTER_INPUT_VALUE_CHANGE:
      "global errors days filter input value change",
    GLOBAL_ERRORS_DAYS_FILTER_INCREMENT_CLICKED:
      "global errors days filter increment change",
    GLOBAL_ERRORS_DAYS_FILTER_DECREMENT_CLICKED:
      "global errors days filter decrement change",
    GLOBAL_ERRORS_DAYS_FILTER_APPLY_BTN_CLICKED:
      "global errors days filter apply button clicked",
    GLOBAL_ERRORS_VIEW_RESET_FILTERS_BUTTON_CLICKED:
      "global errors view reset filters button clicked",
    GLOBAL_ERRORS_VIEW_FILTERS_BUTTON_CLICKED:
      "global errors view filters button clicked",
    GLOBAL_ERRORS_VIEW_SERVICES_FILTER_CHANGED:
      "global errors view services filter changed",
    GLOBAL_ERRORS_VIEW_ENDPOINTS_FILTER_CHANGED:
      "global errors view endpoints filter changed",
    GLOBAL_ERRORS_VIEW_ERROR_TYPES_FILTER_CHANGED:
      "global errors view error types filter changed",
    GLOBAL_ERRORS_VIEW_CRITICALITY_FILTER_CHANGED:
      "global errors view criticality filter changed",
    GLOBAL_ERRORS_VIEW_UNHANDLED_FILTER_CHANGED:
      "global errors view unhandled filter changed",
    GLOBAL_ERRORS_VIEW_FILTERS_CLOSE_BUTTON_CLICKED:
      "global errors view filters close button clicked",
    GLOBAL_ERRORS_VIEW_FILTERS_APPLY_FILTERS_BUTTON_CLICKED:
      "global errors view filters apply filters button clicked",
    GLOBAL_ERRORS_VIEW_CLEAR_FILTERS_BUTTON_CLICKED:
      "global errors view clear filters button clicked",
    ERROR_CARD_SOURCE_LINK_CLICKED: "error card source link clicked",
    ERROR_CARD_SELECTED_AFFECTED_ENDPOINT_CHANGED:
      "error card selected affected endpoint changed",
    ERROR_CARD_AFFECTED_ENDPOINT_LINK_CLICKED:
      "error card affected endpoint link clicked",
    ERROR_CARD_HISTOGRAM_BUTTON_CLICKED: "error card histogram button clicked",
    ERROR_CARD_PIN_UNPIN_BUTTON_CLICKED: "error card pin unpin button clicked",
    ERROR_CARD_DISMISS_BUTTON_CLICKED: "error card dismiss button clicked",
    ERROR_CARD_PIN_UNDISMISS_BUTTON_CLICKED:
      "error card pin undismiss button clicked"
  },
  " "
);
