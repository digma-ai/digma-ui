import { actions } from "../../actions";

interface OpenURLInDefaultBrowserPayload {
  url: string;
}

export const openURLInDefaultBrowser = (url: string) => {
  switch (window.platform) {
    case "JetBrains":
    case "VS Code":
      window.sendMessageToDigma<OpenURLInDefaultBrowserPayload>({
        action: actions.OPEN_URL_IN_DEFAULT_BROWSER,
        payload: {
          url
        }
      });
      return;
    case "Web":
      window.open(url, "_blank", "noopener noreferrer");
  }
};
