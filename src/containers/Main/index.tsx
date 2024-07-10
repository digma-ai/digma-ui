import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { router } from "./router";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.onerror = (message, source, lineno, colno, error) => {
  handleUncaughtError("main", message, source, lineno, colno, error);
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <RouterProvider router={router} />
    </App>
  );
}
