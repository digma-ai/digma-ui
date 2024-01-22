import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "tests";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded",
    TEST_NAME_LINK_CLICKED: "test name link clicked",
    GO_TO_TRACE_BUTTON_CLICKED: "go to trace button clicked",
    RUN_TEST_BUTTON_CLICKED: "run test button clicked",
    JIRA_TICKET_INFO_BUTTON_CLICKED: "jira ticket info button clicked"
  },
  " "
);
