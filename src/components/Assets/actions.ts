import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "ASSETS";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GO_TO_ASSET: "GO_TO_ASSET",
  GET_CATEGORIES_DATA: "GET_CATEGORIES_DATA",
  SET_CATEGORIES_DATA: "SET_CATEGORIES_DATA"
});