import { actions as globalActions } from "../../actions";
import { actions as dashboardActions } from "../../components/Dashboard/actions";
import { DigmaOutgoingMessageData } from "../types";
import { getAboutInfo } from "./services/about";
import { GetDashboardParams, getDashboard } from "./services/dashboard";
import { GetEnvironmentParams, getEnvironment } from "./services/environments";

export const sendMessageToWebService = <T>(
  message: DigmaOutgoingMessageData<T>
) => {
  switch (message.action) {
    case dashboardActions.GET_DATA:
      void getDashboard(
        message.payload as GetDashboardParams<Record<string, unknown>>
      );
      break;
    case globalActions.GET_BACKEND_INFO:
      void getAboutInfo();
      break;
    case dashboardActions.GET_ENVIRONMENT_INFO:
      void getEnvironment(
        message.payload as GetEnvironmentParams,
        dashboardActions.SET_ENVIRONMENT_INFO
      );
  }
};
