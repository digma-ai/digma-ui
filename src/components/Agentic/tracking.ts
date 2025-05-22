import { APP_ID } from "../../containers/Admin/constants";
import { addPrefix } from "../../utils/addPrefix";

export const trackingEvents = addPrefix(
  APP_ID,
  {
    LOGO_LINK_CLICKED: "logo link clicked",
    TEMPLATE_BUTTON_CLICKED: "template button clicked"
  },
  " "
);
