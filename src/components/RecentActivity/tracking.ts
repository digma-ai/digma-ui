import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "recent activity";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    NAVIGATED_TO_THE_NEWLY_CREATED_PENDING_ENVIRONMENT:
      "navigated to newly created pending environment",
    ENVIRONMENT_TYPE_BUTTON_CLICKED: "environment type button clicked",
    CHECK_CONNECTION_RESULT_RECEIVED: "check connection result received",
    FINISH_BUTTON_CLICKED: "finish button clicked",
    OBSERVABILITY_TOGGLE_SWITCHED: "observability toggle switched"
  },
  " "
);
