import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "ERRORS";

export const actions = addPrefix(ACTION_PREFIX, {
  GET_ERRORS_DATA: "GET_ERRORS_DATA",
  SET_ERRORS_DATA: "SET_ERRORS_DATA",
  GET_ERROR_DETAILS: "GET_ERROR_DETAILS",
  SET_ERROR_DETAILS: "SET_ERROR_DETAILS",
  GO_TO_TRACE: "GO_TO_TRACE",
  OPEN_RAW_ERROR_STACK_TRACE_IN_EDITOR: "OPEN_RAW_ERROR_STACK_TRACE_IN_EDITOR",
  GO_TO_CODE_LOCATION: "GO_TO_CODE_LOCATION",
  GET_FILES_URIS: "GET_FILES_URIS",
  SET_FILES_URIS: "SET_FILES_URIS",
  GET_GLOBAL_ERRORS_DATA: "GET_GLOBAL_ERRORS_DATA",
  SET_GLOBAL_ERRORS_DATA: "SET_GLOBAL_ERRORS_DATA",
  GET_GLOBAL_ERRORS_FILTERS_DATA: "GET_GLOBAL_ERRORS_FILTERS_DATA",
  SET_GLOBAL_ERRORS_FILTERS_DATA: "SET_GLOBAL_ERRORS_FILTERS_DATA",
  GET_ERROR_TIME_SERIES_DATA: "GET_ERROR_TIME_SERIES_DATA",
  SET_ERROR_TIME_SERIES_DATA: "SET_ERROR_TIME_SERIES_DATA",
  PIN_ERROR: "PIN_ERROR",
  UNPIN_ERROR: "UNPIN_ERROR",
  SET_PIN_ERROR_RESULT: "SET_PIN_ERROR_RESULT",
  SET_UNPIN_ERROR_RESULT: "SET_UNPIN_ERROR_RESULT",
  DISMISS_ERROR: "DISMISS_ERROR",
  UNDISMISS_ERROR: "UNDISMISS_ERROR",
  SET_DISMISS_ERROR_RESULT: "SET_DISMISS_ERROR_RESULT",
  SET_UNDISMISS_ERROR_RESULT: "SET_UNDISMISS_ERROR_RESULT"
});
