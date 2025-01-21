import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { Login } from "../../components/Login";
import { GoogleAuthHoC } from "./GoogleAuthHoC";

const APP_ID = "login";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App id={APP_ID}>
        <GoogleAuthHoC>
          <Login />
        </GoogleAuthHoC>
      </App>
    </StrictMode>
  );
}
