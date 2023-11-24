import { client } from "../client";

export interface GetEnvironmentParams {
  environmentId: string;
}

export interface GetEnvironmentResponse {
  environmentName: string;
  environmentId: string;
  displayName: string;
}

const REQUEST_TIMEOUT = 3000;

export const getEnvironment = async (
  data: GetEnvironmentParams,
  responseAction: string
) => {
  try {
    const response = await client.get<GetEnvironmentResponse>(
      "/environments/getEnvironment",
      { signal: AbortSignal.timeout(REQUEST_TIMEOUT), params: data }
    );

    window.postMessage({
      type: "digma",
      action: responseAction,
      payload: response.data
    });
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";

    window.postMessage({
      type: "digma",
      action: responseAction,
      payload: {
        data: null,
        error: {
          message: errorMessage
        }
      }
    });
  }
};
