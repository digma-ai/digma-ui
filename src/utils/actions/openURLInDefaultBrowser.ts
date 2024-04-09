import { actions } from "../../actions";
import { isString } from "../../typeGuards/isString";

interface OpenURLInDefaultBrowserPayload {
  url: string;
  title?: string;
}

export const openURLInDefaultBrowser = (url: string, title?: string) => {
  window.sendMessageToDigma<OpenURLInDefaultBrowserPayload>({
    action: actions.OPEN_URL_IN_DEFAULT_BROWSER,
    payload: {
      url,
      ...(isString(title) ? { title } : {})
    }
  });
};
