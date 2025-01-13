import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Dashboard } from "../../components/Dashboard";
import { MetricsReport } from "../../components/Dashboard/MetricsReport";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { store } from "../Dashboard/store";
import { GlobalStyle } from "./styles";

const APP_ID = "dashboard";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

const rootElement = document.getElementById("root");

const initialPath = isString(window.initialRoutePath)
  ? window.initialRoutePath
  : undefined;

const getView = () => {
  switch (initialPath) {
    case "report":
      return <MetricsReport />;

    default:
      return <Dashboard />;
  }
};

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App id={APP_ID}>
          <GlobalStyle />
          {getView()}
        </App>
      </Provider>
    </StrictMode>
  );
}
