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
    ISSUES_FILTER_PRESET_BUTTON_CLICKED: "issues filter preset button clicked",
    ISSUE_CARD_CLICKED: "issue card clicked",
    ISSUE_CARD_TITLE_ASSET_LINK_CLICKED: "issue card title asset link clicked",
    ISSUE_CARD_KEBAB_MENU_ITEM_CLICKED: "issue card kebab menu item clicked",
    PROMOTION_CLOSE_EXPANDED_VIEW_BUTTON_CLICKED:
      "promotion close expanded view button clicked",
    PROMOTION_OPEN_EXPANDED_VIEW_BUTTON_CLICKED:
      "promotion open expanded view button clicked",
    ENVIRONMENT_SELECTED: "environment selected",
    ENVIRONMENT_MENU_BUTTON_CLICKED: "environment menu button clicked",
    FILTER_ICON_BUTTON_CLICKED: "filter icon button clicked",
    INSIGHTS_INFO_OPEN_DOCS_CLICKED: "insights info open docs clicked",
    INSIGHTS_INFO_CLOSE_CLICKED: "insights info close clicked"
  },
  " "
);
