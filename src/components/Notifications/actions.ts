import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "NOTIFICATIONS";
export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  CLOSE: "CLOSE",
  GO_TO_NOTIFICATIONS: "GO_TO_NOTIFICATIONS"
});
