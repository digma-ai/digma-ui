import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "NAVIGATION";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  CHANGE_VIEW: "CHANGE_VIEW",
  SET_VIEW: "SET_VIEW",
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  CHANGE_SCOPE: "CHANGE_SCOPE"
});
