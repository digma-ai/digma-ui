import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { addPrefix } from "../../utils/addPrefix";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";

const TRACKING_PREFIX = "recent activity";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    NAVIGATED_TO_THE_NEWLY_CREATED_PENDING_ENVIRONMENT:
      "navigated to newly created pending environment",
    ENVIRONMENT_TYPE_BUTTON_CLICKED: "environment type button clicked",
    CHECK_CONNECTION_RESULT_RECEIVED: "check connection result received",
    FINISH_BUTTON_CLICKED: "finish button clicked",
    OBSERVABILITY_TOGGLE_SWITCHED: "observability toggle switched",
    ADD_TO_RUN_CONFIG_CLICKED: "add to run config clicked",
    REGISTRATION_FORM_SUBMITTED: "registration form submitted",
    CREATE_NEW_ENVIRONMENT_FORM_SUBMITTED:
      "create new environment form submitted",
    CANCEL_BUTTON_CLICKED_ON_ENVIRONMENT_CREATION_WIZARD:
      "cancel button clicked environment creation wizard",
    FAILED_TO_CREATE_ENVIRONMENT: "failed to create environment",
    CREATE_ENVIRONMENT_WIZARD_ENV_TYPE_SELECTED:
      "create environment wizard env type selected"
  },
  " "
);

export const sendUserActionEvent = (action: string, payload?: object) => {
  sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
    action: action,
    ...payload
  });
};
