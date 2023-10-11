import { actions as dashboardActions } from "../../components/Dashboard/actions";
import { DigmaOutgoingMessageData } from "../types";
import { GetDashboardParams, getDashboard } from "./services/dashboard";

export const sendMessageToWebService = (message: DigmaOutgoingMessageData) => {
  switch (message.action) {
    case dashboardActions.GET_DATA:
      void getDashboard(
        message.payload as GetDashboardParams<Record<string, unknown>>
      );
      break;
  }
};
