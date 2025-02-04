import posthog from "posthog-js";
import { isString } from "./typeGuards/isString";

let isInitialized = false;

export const initPosthog = () => {
  if (!isString(window.postHogApiKey) || !isString(window.postHogHost)) {
    return null;
  }

  if (!isInitialized) {
    posthog.init(window.postHogApiKey, {
      api_host: window.postHogHost,
      disable_session_recording: true
    });

    posthog.register({
      "ui.version": document.head.querySelector<HTMLMetaElement>(
        'meta[name="digma-ui-version"]'
      )?.content,
      platform: window.platform
    });

    isInitialized = true;
  }

  return posthog;
};

const posthogInstance = initPosthog();

export default posthogInstance;
