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
    WORKSPACE_ONLY_TOGGLE_SWITCHED: "workspace only toggle switched"
  },
  " "
);
