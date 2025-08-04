import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { sendMessage } from "../../api";
import { App } from "../../components/common/App";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { IdeLauncher } from "../../components/IdeLauncher";
import posthog from "../../posthog";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";

posthog?.register({ app: APP_ID });

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

// TODO: make not required and remove
window.sendMessageToDigma = sendMessage;

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC client={posthog}>
        <App id={APP_ID}>
          <IdeLauncher />
        </App>
      </PostHogHoC>
    </StrictMode>
  );
}
