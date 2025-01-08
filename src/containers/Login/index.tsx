import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { Login } from "../../components/Login";

const APP_ID = "login";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App id={APP_ID}>
        <Login />
      </App>
    </StrictMode>
  );
}
