import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Documentation } from "../../components/Documentation";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { GlobalStyle } from "./styles";

const APP_ID = "documentation";

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
    <StrictMode>
      <App id={APP_ID}>
        <GlobalStyle />
        <Documentation />
      </App>
    </StrictMode>
  );
}
