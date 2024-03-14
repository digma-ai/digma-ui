import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Insights } from "../../components/Insights";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { GlobalStyle } from "./styles";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <GlobalStyle />
      <Insights insightViewType={"Issues"} />
    </App>
  );
}
