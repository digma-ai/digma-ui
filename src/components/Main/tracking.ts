import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "main";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PROMOTION_REGISTRATION_CARD_SLACK_LINK_CLICKED:
      "promotion registration card slack link clicked",
    PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED:
      "promotion cancel confirmation close clicked",
    PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED:
      "promotion cancel confirmation accept clicked",
    PROMOTION_REGISTRATION_FORM_SUBMITTED:
      "promotion registration form submitted",
    PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED:
      "promotion registration close button clicked",
    PROMOTION_DISCARDED: "promotion discarded",
    PROMOTION_REGISTRATION_FORM_OPENED: "promotion registration form opened",
    LOGIN_SCREEN_VIEWED: "login screen viewed",
    SCOPE_BAR_EXPAND_BUTTON_CLICKED: "span info expand button clicked",
    SCOPE_BAR_COLLAPSE_BUTTON_CLICKED: "span info collapse button clicked",
    SPAN_INFO_COLLAPSE_BUTTON_CLICKED: "span info collapse button clicked"
  },
  " "
);
