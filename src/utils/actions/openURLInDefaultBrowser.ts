import { actions } from "../../actions";
import { isString } from "../../typeGuards/isString";

export const openURLInDefaultBrowser = (url: string, title?: string) => {
  window.sendMessageToDigma({
    action: actions.OPEN_URL_IN_DEFAULT_BROWSER,
    payload: {
      url,
      ...(isString(title) ? { title } : {})
    }
  });
};
