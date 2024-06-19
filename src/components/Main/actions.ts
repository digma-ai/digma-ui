import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "MAIN";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  SET_VIEWS: "SET_VIEWS", // deprecated
  GET_HIGHLIGHTS_TOP_ISSUES_DATA: "GET_HIGHLIGHTS_TOP_ISSUES_DATA",
  SET_HIGHLIGHTS_TOP_ISSUES_DATA: "SET_HIGHLIGHTS_TOP_ISSUES_DATA",
  GET_HIGHLIGHTS_PERFORMANCE_DATA: "GET_HIGHLIGHTS_PERFORMANCE_DATA",
  SET_HIGHLIGHTS_PERFORMANCE_DATA: "SET_HIGHLIGHTS_PERFORMANCE_DATA",
  GET_HIGHLIGHTS_IMPACT_DATA: "GET_HIGHLIGHTS_IMPACT_DATA",
  SET_HIGHLIGHTS_IMPACT_DATA: "SET_HIGHLIGHTS_IMPACT_DATA",
  GET_HIGHLIGHTS_SPAN_INFO_DATA: "GET_SPAN_INFO_DATA",
  SET_HIGHLIGHTS_SPAN_INFO_DATA: "SET_SPAN_INFO_DATA",
  GET_HIGHLIGHTS_SCALING_DATA: "GET_HIGHLIGHTS_SCALING_DATA",
  SET_HIGHLIGHTS_SCALING_DATA: "SET_HIGHLIGHTS_SCALING_DATA"
});
