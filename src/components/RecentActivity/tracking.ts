import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "recent activity";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    NAVIGATED_TO_THE_NEWLY_CREATED_PENDING_ENVIRONMENT:
      "navigated to newly created pending environment",
    ENVIRONMENT_TYPE_BUTTON_CLICKED: "environment type button clicked",
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
    LOCAL_REGISTRATION_FORM_SUBMITTED: "local registration form submitted",
    CREATE_NEW_ENVIRONMENT_FORM_SUBMITTED:
      "create new environment form submitted",
    CANCEL_BUTTON_CLICKED_ON_ENVIRONMENT_CREATION_WIZARD:
      "cancel button clicked environment creation wizard",
    FAILED_TO_CREATE_ENVIRONMENT: "failed to create environment",
    CREATE_ENVIRONMENT_WIZARD_ENV_TYPE_SELECTED:
      "create environment wizard env type selected",
    CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CONFIRM_CLICKED:
      "create environment cancel confirmation confirm clicked",
    CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CANCEL_CLICKED:
      "create environment cancel confirmation cancel clicked",
    CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CLOSE_CLICKED:
      "create environment cancel confirmation close clicked",
    DIGMATHON_UPDATE_PROGRESS_BUTTON_CLICKED:
      "digmathon update progress button clicked",
    DIGMATHON_LEADERBOARD_BUTTON_CLICKED:
      "digmathon leaderboard button clicked",
    DIGMATHON_FIND_OUT_MORE_BUTTON_CLICKED:
      "digmathon find out more button clicked"
  },
  " "
);
