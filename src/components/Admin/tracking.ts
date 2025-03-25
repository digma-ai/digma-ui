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
    ISSUES_SIDEBAR_OVERLAY_CLICKED: "issues sidebar overlay clicked",
    ISSUES_SIDEBAR_ESCAPE_KEY_PRESSED: "issues sidebar escape key pressed",
    ISSUES_SIDEBAR_CLOSE_BUTTON_CLICKED: "issues sidebar close button clicked",
    ISSUES_SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_PRESSED:
      "issues sidebar resize handle mouse button pressed",
    ISSUES_SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_RELEASED:
      "issues sidebar resize handle mouse button released",
    ISSUES_SIDEBAR_PAGE_CHANGED: "issues sidebar page changed",
    ISSUES_SIDEBAR_SHOW_ONLY_DISMISSED_BUTTON_CLICKED:
      "issues sidebar show only dismissed button clicked",
    ISSUES_SIDEBAR_SHOW_ALL_BUTTON_CLICKED:
      "issues sidebar show all button clicked",
    ISSUES_SIDEBAR_BACK_BUTTON_CLICKED: "issues sidebar back button clicked",
    ISSUES_SIDEBAR_FORWARD_BUTTON_CLICKED:
      "issues sidebar forward button clicked",
    ISSUES_SIDEBAR_HOME_BUTTON_CLICKED: "issues sidebar home button clicked",
    SUGGESTION_BAR_CLOSE_BUTTON_CLICKED: "suggestion bar close button clicked",
    SUGGESTION_BAR_ASSETS_TOGGLE_VALUE_CHANGED:
      "suggestion bar assets toggle value changed",
    SUGGESTION_BAR_PAGE_CHANGED: "suggestion bar page changed"
  },
  " "
);
