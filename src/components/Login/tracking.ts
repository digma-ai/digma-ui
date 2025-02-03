import { addPrefix } from "../../utils/addPrefix";
import { APP_ID } from "./constants";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    SIGN_IN_FORM_SUBMITTED: "sign in form submitted",
    SIGN_IN_WITH_GOOGLE_BUTTON_CLICKED: "sign in with google button clicked",
    GOOGLE_AUTHORIZATION_CODE_RECEIVED: "google authorization code received",
    GOOGLE_AUTHORIZATION_CODE_ERROR: "google authorization code error"
  },
  " "
);
