import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { GoogleAuthHoC } from "../../components/common/GoogleAuthHoC";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { Login } from "../../components/Login";
import posthog from "../../posthog";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";

posthog?.register({ app: APP_ID });

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

const rootElement = document.getElementById("root");

const googleClientId = isString(window.googleClientId)
  ? window.googleClientId
  : undefined;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC client={posthog}>
        <App id={APP_ID}>
          <GoogleAuthHoC clientId={googleClientId}>
            <Login />
          </GoogleAuthHoC>
        </App>
      </PostHogHoC>
    </StrictMode>
  );
}
