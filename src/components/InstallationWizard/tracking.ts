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
    NO_DOCKER_SLACK_LINK_CLICKED: "no docker slack link clicked"
  },
  " "
);
