import { addPrefix } from "../../../utils/addPrefix";

const ACTION_PREFIX = "ISSUES";

export const actions = addPrefix(ACTION_PREFIX, {
  SET_DATA_LIST: "SET_DATA_LIST",
  GET_DATA_LIST: "GET_DATA_LIST",
  GET_FILTERS: "GET_FILTERS",
  SET_FILTERS: "SET_FILTERS"
});
