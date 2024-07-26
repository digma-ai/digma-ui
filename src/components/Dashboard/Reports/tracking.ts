import { addPrefix } from "../../../utils/addPrefix";

const TRACKING_PREFIX = "report";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    REFRESH_DATA_CLICKED: "refresh report data clicked",
    DOWNLOAD_REPORT_CLICKED: "download report data clicked"
  },
  " "
);
