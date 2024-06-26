import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "TESTS";

export const actions = addPrefix(ACTION_PREFIX, {
  GET_SPAN_LATEST_DATA: "SPAN_GET_LATEST_DATA",
  SET_SPAN_LATEST_DATA: "SPAN_SET_LATEST_DATA",
  RUN_TEST: "RUN_TEST",
  GO_TO_TRACE: "GO_TO_TRACE"
});
