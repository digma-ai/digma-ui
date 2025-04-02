import { APP_ID } from "../../containers/IdeLauncher/constants";
import { addPrefix } from "../../utils/addPrefix";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    EMAIL_CONFIRMATION_RESULT_RECEIVED: "email confirmation result received"
  },
  " "
);
