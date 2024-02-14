import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "navigation";

export const trackingEvents = addPrefix(TRACKING_PREFIX, {}, " ");
