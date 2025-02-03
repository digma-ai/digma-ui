import posthog from "posthog-js";

export const initPosthog = (apiKey: string, host: string, appId: string) => {
  posthog.init(apiKey, {
    api_host: host,
    disable_session_recording: true
  });

  posthog.register({
    app: appId,
    "ui.version": document.head.querySelector<HTMLMetaElement>(
      'meta[name="digma-ui-version"]'
    )?.content,
    platform: window.platform
  });
};
