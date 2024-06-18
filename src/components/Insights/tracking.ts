import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "insights";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    JIRA_TICKET_INFO_BUTTON_CLICKED: "jira ticket info button clicked",
    JIRA_TICKET_HINT_CLOSED: "jira ticket hint closed",
    INSIGHT_CARD_DISMISS_BUTTON_CLICKED: "insight card dismiss button clicked",
    INSIGHT_CARD_SHOW_BUTTON_CLICKED: "insight card show button clicked",
    INSIGHT_CARD_CREATE_TICKET_LINK_CLICKED:
      "insight card create ticket link clicked",
    INSIGHT_CARD_MARK_AS_READ_BUTTON_CLICKED:
      "insight card mark as read button clicked",
    REFRESH_BUTTON_CLICKED: "refresh button clicked",
    INSIGHT_CARD_ASSET_LINK_CLICKED: "insight card asset link clicked",
    PROMOTION_CLOSE_EXPANDED_VIEW_BUTTON_CLICKED:
      "promotion close expanded view button clicked",
    PROMOTION_OPEN_EXPANDED_VIEW_BUTTON_CLICKED:
      "promotion open expanded view button clicked"
  },
  " "
);
