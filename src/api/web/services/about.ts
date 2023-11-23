import { actions as globalActions } from "../../../actions";
import { BackendInfo } from "../../../components/common/App/types";
import { client } from "../client";

export const getAboutInfo = async () => {
  try {
    const response = await client.get<BackendInfo>("/about");

    window.postMessage({
      type: "digma",
      action: globalActions.SET_BACKEND_INFO,
      payload: response.data
    });
  } catch (e) {
    console.error(e);
  }
};
