import { actions } from "../actions";

export const openURLInDefaultBrowser = (url: string) => {
  window.sendMessageToDigma({
    action: actions.OPEN_URL_IN_DEFAULT_BROWSER,
    payload: {
      url
    }
  });
};
