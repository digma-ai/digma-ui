import { createRoot } from "react-dom/client";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../../api";
import { Dashboard } from "../../components/Dashboard";
import { Reports } from "../../components/Dashboard/Reports";
import { App } from "../../components/common/App";
import { dispatcher } from "../../dispatcher";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { GlobalStyle } from "./styles";

initializeDigmaMessageListener(dispatcher);

window.sendMessageToDigma = sendMessage;
window.cancelMessageToDigma = cancelMessage;

window.onerror = (message, source, lineno, colno, error) => {
  handleUncaughtError("dashboard", message, source, lineno, colno, error);
};

const rootElement = document.getElementById("root");

const initialPath = isString(window.initialRoutePath)
  ? window.initialRoutePath
  : undefined;

const getView = () => {
  switch (initialPath) {
    case "report":
      return <Reports />;

    default:
      return <Dashboard />;
  }
};

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App>
      <GlobalStyle />
      {getView()}
    </App>
  );
}
