import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "highlights";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    VIEW_ALL_LINK_CLICKED: "view all link clicked",
    TOP_ISSUE_CARD_ASSET_LINK_CLICKED: "top issue card asset link clicked"
  },
  " "
);
