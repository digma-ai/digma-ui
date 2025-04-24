import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "recent activity";
export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    NAVIGATED_TO_NEWLY_CREATED_PENDING_ENVIRONMENT:
      "navigated to newly created pending environment",
    CHECK_CONNECTION_RESULT_RECEIVED: "check connection result received",
    FINISH_BUTTON_CLICKED: "finish button clicked",
    KEBAB_MENU_ITEM_CLICKED: "kebab menu item clicked",
    DIGMATHON_VIEW_BACK_BUTTON_CLICKED: "digmathon view back button clicked",
    DIGMATHON_VIEW_EXIT_BUTTON_CLICKED: "digmathon view exit button clicked",
    DIGMATHON_VIEW_CONTACT_LINK_CLICKED: "digmathon view contact link clicked",
    DIGMATHON_PROGRESS_VIEWED: "digmathon progress viewed",
    DIGMATHON_CONGRATULATIONS_VIEWED: "digmathon congratulations viewed",
    LIVE_VIEW_CLOSE_BUTTON_CLICKED: "live view close button clicked",
    OBSERVABILITY_TOGGLE_SWITCHED: "observability toggle switched",
    SET_ACTIVE_RUN_CONFIG_BUTTON_CLICKED:
      "set active run config button clicked",
    REMOVE_FROM_RUN_CONFIG_LINK_CLICKED: "remove from run config link clicked",
    DIGMATHON_UPDATE_PROGRESS_BUTTON_CLICKED:
      "digmathon update progress button clicked",
    DIGMATHON_LEADERBOARD_BUTTON_CLICKED:
      "digmathon leaderboard button clicked",
    DIGMATHON_FIND_OUT_MORE_BUTTON_CLICKED:
      "digmathon find out more button clicked",
    ENVIRONMENT_TAB_MENU_ITEM_SELECTED: "environment tab menu item selected",
    CONFIRMATION_DIALOG_CONFIRM_BUTTON_CLICKED:
      "confirmation dialog confirm button clicked",
    CONFIRMATION_DIALOG_CLOSE_BUTTON_CLICKED:
      "confirmation dialog close button clicked",
    CONFIRMATION_DIALOG_CANCEL_BUTTON_CLICKED:
      "confirmation dialog cancel button clicked",
    OVERLAY_CLOSED: "overlay closed"
  },
  " "
);
