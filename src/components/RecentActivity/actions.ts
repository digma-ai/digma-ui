import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "RECENT_ACTIVITY";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_DATA: "SET_DATA",
  SET_LIVE_DATA: "SET_LIVE_DATA",
  GO_TO_SPAN: "GO_TO_SPAN",
  GO_TO_TRACE: "GO_TO_TRACE",
  CLOSE_LIVE_VIEW: "CLOSE_LIVE_VIEW",
  ADD_ENVIRONMENT: "ADD_ENVIRONMENT",
  SET_ENVIRONMENT_TYPE: "SET_ENVIRONMENT_TYPE",
  DELETE_ENVIRONMENT: "DELETE_ENVIRONMENT",
  ADD_ENVIRONMENT_TO_RUN_CONFIG: "ADD_ENVIRONMENT_TO_RUN_CONFIG",
  REGISTER: "REGISTER",
  CHECK_REMOTE_ENVIRONMENT_CONNECTION: "CHECK_REMOTE_ENVIRONMENT_CONNECTION",
  APPLY_REMOTE_ENVIRONMENT_SETTINGS: "APPLY_REMOTE_ENVIRONMENT_SETTINGS",
  SET_REMOTE_ENVIRONMENT_CONNECTION_CHECK_RESULT:
    "SET_REMOTE_ENVIRONMENT_CONNECTION_CHECK_RESULT",
  FINISH_ORG_DIGMA_SETUP: "FINISH_ORG_DIGMA_SETUP",
  OPEN_REGISTRATION_DIALOG: "OPEN_REGISTRATION_DIALOG"
});
