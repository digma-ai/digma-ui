import { addPrefix } from "../../../utils/addPrefix";

const TRACKING_PREFIX = "report";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    REFRESH_DATA_CLICKED: "refresh report data clicked",
    DOWNLOAD_REPORT_CLICKED: "download report data clicked",
    ENVIRONMENT_FILTER_SELECTED: "environment filter selected",
    SERVICES_FILTER_SELECTED: "service filter selected",
    TABLE_SEE_ISSUES_LINK_CLICKED: "table see issues link clicked",
    HEATMAP_SEE_ISSUES_LINK_CLICKED: "heatmap see issues link clicked"
  },
  " "
);
