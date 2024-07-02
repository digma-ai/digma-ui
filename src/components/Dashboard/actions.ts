import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "DASHBOARD";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GET_ENVIRONMENT_INFO: "GET_ENVIRONMENT_INFO",
  SET_ENVIRONMENT_INFO: "SET_ENVIRONMENT_INFO"
});
