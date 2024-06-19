import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { router } from "./router";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <RouterProvider router={router} />
    </App>
  );
}
