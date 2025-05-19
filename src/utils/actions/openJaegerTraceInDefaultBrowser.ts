import { isString } from "../../typeGuards/isString";
import { openURLInDefaultBrowser } from "./openURLInDefaultBrowser";

export const openJaegerTraceInDefaultBrowser = (
  traceId: string,
  spanCodeObjectId?: string
) => {
  if (isString(window.jaegerURL) && window.jaegerURL.length > 0) {
    let url = `${window.jaegerURL}/trace/${traceId}`;

    if (spanCodeObjectId) {
      url = url.concat(`?uiFind=${spanCodeObjectId}`);
    }

    openURLInDefaultBrowser(url);
  }
};
