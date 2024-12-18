import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { Login } from "../../components/Login";

const APP_ID = "login";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App id={APP_ID}>
      <Login />
    </App>
  );
}
