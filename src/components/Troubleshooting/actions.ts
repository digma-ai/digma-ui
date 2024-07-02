import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "TROUBLESHOOTING";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  CLOSE: "CLOSE"
});
