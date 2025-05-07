import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { RecentActivity } from "../../components/RecentActivity";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { store } from "./store";
import { GlobalStyle } from "./styles";

const APP_ID = "recentActivity";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

window.addEventListener("online", (event) => {
  // eslint-disable-next-line no-console
  console.log("You are now connected to the network.");
  // eslint-disable-next-line no-console
  console.log("Event: ", event);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App id={APP_ID}>
          <GlobalStyle />
          <RecentActivity />
        </App>
      </Provider>
    </StrictMode>
  );
}
