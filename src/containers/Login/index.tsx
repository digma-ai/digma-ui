import posthog from "posthog-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { GoogleAuthHoC } from "../../components/common/GoogleAuthHoC";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { Login } from "../../components/Login";
import { initPosthog } from "../../posthog";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "../Admin/constants";

if (isString(window.postHogApiKey) && isString(window.postHogHost)) {
  initPosthog(window.postHogApiKey, window.postHogHost, APP_ID);
}

const rootElement = document.getElementById("root");

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC posthogClient={posthog}>
        <App id={APP_ID}>
          <GoogleAuthHoC>
            <Login />
          </GoogleAuthHoC>
        </App>
      </PostHogHoC>
    </StrictMode>
  );
}
