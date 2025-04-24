import { APP_ID } from "../../containers/Admin/constants";
import { addPrefix } from "../../utils/addPrefix";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    LOGO_LINK_CLICKED: "logo link clicked",
    NAV_MENU_ITEM_CLICKED: "nav menu item clicked",
    TRIAL_PROMOTION_CARD_START_NOW_BUTTON_CLICKED:
      "trial promotion card start now button clicked",
    LOGOUT_BUTTON_CLICKED: "logout button clicked",
    ENVIRONMENT_CHANGED: "environment changed",
    SERVICES_CHANGED: "selected services changed",
    TOP_ISSUES_WIDGET_BY_CRITICALITY_BUTTON_CLICKED:
      "top issues widget by criticality button clicked",
    TOP_ISSUES_WIDGET_BY_SEVERITY_BUTTON_CLICKED:
      "top issues widget by severity button clicked",
    REPORT_WIDGET_CLICKED: "report widget clicked",
    SIDEBAR_OVERLAY_CLICKED: "sidebar overlay clicked",
    SIDEBAR_ESCAPE_KEY_PRESSED: "sidebar escape key pressed",
    SIDEBAR_CLOSE_BUTTON_CLICKED: "sidebar close button clicked",
    SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_PRESSED:
      "sidebar resize handle mouse button pressed",
    SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_RELEASED:
      "sidebar resize handle mouse button released",
    REPOSITORY_SIDEBAR_BACK_BUTTON_CLICKED:
      "repository sidebar back button clicked",
    REPOSITORY_SIDEBAR_FORWARD_BUTTON_CLICKED:
      "repository sidebar forward button clicked",
    REPOSITORY_SIDEBAR_HOME_BUTTON_CLICKED:
      "repository sidebar home button clicked",
    ISSUES_PAGE_CHANGED: "issues page changed",
    ISSUES_SHOW_ONLY_DISMISSED_BUTTON_CLICKED:
      "issues show only dismissed button clicked",
    ISSUES_SHOW_ALL_BUTTON_CLICKED: "issues show all button clicked",
    ANALYTICS_PAGE_CHANGED: "analytics page changed",
    ANALYTICS_SEE_ALL_ASSETS_BUTTON_CLICKED:
      "analytics see all assets button clicked",
    SUGGESTION_BAR_CLOSE_BUTTON_CLICKED: "suggestion bar close button clicked",
    SUGGESTION_BAR_ASSETS_TOGGLE_VALUE_CHANGED:
      "suggestion bar assets toggle value changed",
    SUGGESTION_BAR_PAGE_CHANGED: "suggestion bar page changed"
  },
  " "
);
