import { createRoot } from "react-dom/client";
import { Admin } from "../../components/Admin";
import { App } from "../../components/common/App";

const APP_ID = "admin";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App id={APP_ID}>
      <Admin />
    </App>
  );
}
