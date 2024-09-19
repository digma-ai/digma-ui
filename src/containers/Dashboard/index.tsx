import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Dashboard } from "../../components/Dashboard";
import { NewReport } from "../../components/Dashboard/NewReport";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
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
      return <NewReport />;

    default:
      return <Dashboard />;
  }
};

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App id={APP_ID}>
      <GlobalStyle />
      {getView()}
    </App>
  );
}
