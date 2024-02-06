import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "NAVIGATION";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_VIEW: "SET_VIEW"
});
