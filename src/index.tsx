import { createRoot } from "react-dom/client";
import { initializeDigmaMessageListener, sendMessage } from "./api/vscode";
import { App } from "./components/App";

const rootElement = document.getElementById("root");

initializeDigmaMessageListener();

window.postMessage({
  type: "digma",
  action: {
    id: "test",
    payload: { Hello: "Digma" }
  }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.sendMessageToDigma = sendMessage;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
