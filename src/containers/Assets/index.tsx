import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Assets } from "../../components/Assets";
import { data } from "../../components/Assets/mockData";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <Assets data={data} />
    </App>
  );
}
