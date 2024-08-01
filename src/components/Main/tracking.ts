import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "main";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PROMOTION_SLACK_LINK_CLICKED:
      "promotion registration card slack link clicked",
    PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED:
      "promotion cancel confirmation close clicked",
    PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED:
      "promotion cancel confirmation accept clicked",
    PROMOTION_REGISTRATION_SUBMITTED: "promotion registration form submitted",
    PROMOTION_REGISTRATION_CLOSED_CLICKED:
      "promotion registration close button clicked",
    PROMOTION_DISCARDED: "promotion discarded",
    PROMOTION_REGISTRATION_OPENED: "promotion registration form opened",
    LOGIN_SCREEN_VIEWED: "login screen viewed"
  },
  " "
);
