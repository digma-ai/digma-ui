import { actions } from "../../actions";

interface OpenURLInIdeEditorTabPayload {
  title: string;
  url: string;
}

export const openURLInIdeEditorTab = (
  payload: OpenURLInIdeEditorTabPayload
) => {
  switch (window.platform) {
    case "JetBrains":
    case "VS Code":
      window.sendMessageToDigma<OpenURLInIdeEditorTabPayload>({
        action: actions.OPEN_URL_IN_EDITOR_TAB,
        payload: payload
      });
  }
};
