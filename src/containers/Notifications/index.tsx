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

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.onerror = (message, source, lineno, colno, error) => {
  handleUncaughtError("notifications", message, source, lineno, colno, error);
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <GlobalStyle />
      <Notifications />
    </App>
  );
}
