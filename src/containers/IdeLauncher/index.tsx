import posthog from "posthog-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { IdeLauncher } from "../../components/IdeLauncher";
import { initPosthog } from "../../posthog";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";

if (isString(window.postHogApiKey) && isString(window.postHogHost)) {
  initPosthog(window.postHogApiKey, window.postHogHost, APP_ID);
}

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC posthogClient={posthog}>
        <App id={APP_ID}>
          <IdeLauncher />
        </App>
      </PostHogHoC>
    </StrictMode>
  );
}
