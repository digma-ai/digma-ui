import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { EmailConfirmation } from "../../components/EmailConfirmation";
import posthog from "../../posthog";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";

posthog?.register({ app: APP_ID });

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC client={posthog}>
        <App id={APP_ID}>
          <EmailConfirmation />
        </App>
      </PostHogHoC>
    </StrictMode>
  );
}
