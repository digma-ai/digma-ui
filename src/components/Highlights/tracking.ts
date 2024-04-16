import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "highlights";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    VIEW_ALL_LINK_CLICKED: "view all link clicked",
    TOP_ISSUES_CARD_ASSET_LINK_CLICKED: "top issues card asset link clicked",
    TOP_ISSUES_CARD_TABLE_ROW_CLICKED: "top issues card table row clicked",
    PERFORMANCE_CARD_TABLE_ROW_CLICKED: "performance card table row clicked"
  },
  " "
);
