import { AxiosError } from "axios";
import { actions as dashboardActions } from "../../../components/Dashboard/actions";
import { client } from "../client";

export type GetDashboardResponse<T> = {
  type: string;
  data: T;
};

export interface GetDashboardParams<T> {
  environment: string;
  type: string;
  query: T;
}

export const getDashboard = async (
  data: GetDashboardParams<Record<string, unknown>>
) => {
  try {
    const response = await client.get<
      GetDashboardResponse<Record<string, unknown>>
    >("/Dashboard/getDashboard", {
      params: { type: data.type, environment: data.environment, ...data.query }
    });

    window.postMessage({
      type: "digma",
      action: dashboardActions.SET_DATA,
      payload: response.data
    });
  } catch (e) {
    console.error(e);
    let errorMessage = e instanceof Error ? e.message : "Unknown error";
    if (e instanceof AxiosError && e.response?.status === 404) {
      errorMessage = "Backend version is outdated. Please update Digma.";
    }

    window.postMessage({
      type: "digma",
      action: dashboardActions.SET_DATA,
      payload: {
        data: null,
        type: data.type,
        error: {
          message: errorMessage
        }
      }
    });
  }
};
