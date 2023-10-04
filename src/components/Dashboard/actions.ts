import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "DASHBOARD";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GO_TO_SPAN: "GO_TO_SPAN"
});