import { addPrefix } from "../../../utils/addPrefix";

const TRACKING_PREFIX = "report";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    REFRESH_DATA_CLICKED: "refresh report data clicked",
    DOWNLOAD_REPORT_CLICKED: "download report data clicked",
    ENVIRONMENT_FILTER_SELECTED: "environment filter selected",
    ENDPOINT_FILTER_SELECTED: "endpoint filter selected",
    SERVICE_FILTER_SELECTED: "service filter selected",
    DATA_FILTER_SELECTED: "data filter selected",
    TABLE_SEE_ISSUES_LINK_CLICKED: "table see issues link clicked",
    TABLE_ITEM_NAME_CLICKED: "table item name clicked",
    HEATMAP_TILE_TITLE_CLICKED: "heatmap tile title clicked",
    HEATMAP_SEE_ISSUES_LINK_CLICKED: "heatmap see issues link clicked",
    PERIOD_FILTER_CHANGED: "period filter changed",
    VIEW_MODE_CHANGED: "view mode changed",
    TIME_MODE_CHANGED: "time mode changed"
  },
  " "
);
