import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "installation wizard";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    INSTALL_STEP_PASSED: "install step passed",
    INSTALL_STEP_AUTOMATICALLY_PASSED: "install step automatically passed",
    GET_DIGMA_DOCKER_EXTENSION_BUTTON_CLICKED:
      "get digma docker extension button clicked",
    OBSERVABILITY_BUTTON_CLICKED: "set observability button clicked",
    TAB_CLICKED: "tab clicked",
    NO_DOCKER_SLACK_LINK_CLICKED: "no docker slack link clicked",
    DIGMA_CLOUD_AVAILABILITY_NOTIFICATION_EMAIL_ADDRESS_CAPTURED:
      "digma cloud availability notification email address captured",
    INSTALLATION_TYPE_BUTTON_CLICKED: "installation type button clicked",
    AUTO_INSTALLATION_FLOW_STARTED: "auto installation flow started",
    AUTO_INSTALLATION_FLOW_FINISHED: "auto installation flow finished",
    ENGINE_ACTION_BUTTON_CLICKED: "engine action button clicked",
    ENGINE_ACTION_MESSAGE_SENT: "engine action message sent",
    ENGINE_ACTION_RESULT_MESSAGE_RECEIVED:
      "engine action result message received"
  },
  " "
);
