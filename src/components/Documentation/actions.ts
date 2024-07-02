import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "DOCUMENTATION";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE"
});
