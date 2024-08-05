import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Notifications } from "../../components/Notifications";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { GlobalStyle } from "./styles";

const APP_ID = "notifications";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App id={APP_ID}>
      <GlobalStyle />
      <Notifications />
    </App>
  );
}
