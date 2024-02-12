import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "NAVIGATION";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  CHANGE_VIEW: "CHANGE_VIEW",
  SET_VIEWS: "SET_VIEWS",
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  CHANGE_SCOPE: "CHANGE_SCOPE"
});
