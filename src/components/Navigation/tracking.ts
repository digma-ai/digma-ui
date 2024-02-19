import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "navigation";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    BACK_BUTTON_CLICKED: "back button clicked",
    FORWARD_BUTTON_CLICKED: "forward button clicked",
    HOME_BUTTON_CLICKED: "home button clicked",
    TARGET_BUTTON_CLICKED: "target button clicked",
    CODE_LOCATION_SELECTED: "code location selected",
    CODE_BUTTON_CLICKED: "code button clicked",
    ASSET_SELECTED: "asset selected",
    TROUBLESHOOTING_LINK_CLICKED: "troubleshooting link clicked",
    ADD_OBSERVABILITY_BUTTON_CLICKED: "add observability button clicked",
    AUTO_FIX_BUTTON_CLICKED: "autofix button clicked",
    ENVIRONMENT_BAR_CLICKED: "environment bar clicked",
    ENVIRONMENT_SELECTED: "environment selected",
    DASHBOARD_BUTTON_CLICKED: "dashboard button clicked",
    KEBAB_MENU_BUTTON_CLICKED: "kebab menu button clicked",
    OBSERVABILITY_TOGGLE_SWITCHED: "observability toggle switched",
    ONBOARDING_LINK_CLICKED: "onboarding link clicked",
    TAB_CLICKED: "tab clicked"
  },
  " "
);
