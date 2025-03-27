import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "MAIN";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE"
});
