import { actions as globalActions } from "../../../actions";
import type { BackendInfo } from "../../../components/common/App/types";
import { logger } from "../../../logging";
import { client } from "../client";

type GetAboutResponse = BackendInfo;

export const getAboutInfo = async () => {
  try {
    const response = await client.get<GetAboutResponse>("/about");

    window.postMessage({
      type: "digma",
      action: globalActions.SET_BACKEND_INFO,
      payload: response.data
    });
  } catch (e) {
    logger.error(e);
  }
};
