import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { IdeLauncher } from "../../components/IdeLauncher";

const APP_ID = "ideLauncher";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App id={APP_ID}>
        <IdeLauncher />
      </App>
    </StrictMode>
  );
}
