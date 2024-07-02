import { actions } from "../../actions";

interface OpenURLInDefaultBrowserPayload {
  url: string;
}

export const openURLInDefaultBrowser = (url: string) => {
  window.sendMessageToDigma<OpenURLInDefaultBrowserPayload>({
    action: actions.OPEN_URL_IN_DEFAULT_BROWSER,
    payload: {
      url
    }
  });
};
