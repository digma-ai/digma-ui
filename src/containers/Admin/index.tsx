import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { sendMessage } from "../../api";
import { App } from "../../components/common/App";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { initPosthog } from "../../posthog";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";
import { router } from "./router";
import { store } from "./store";
import { GlobalStyle } from "./styles";

if (isString(window.postHogApiKey) && isString(window.postHogHost)) {
  initPosthog(window.postHogApiKey, window.postHogHost, APP_ID);
}

const rootElement = document.getElementById("root");

// TODO: make not required and remove
window.sendMessageToDigma = sendMessage;

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC>
        <Provider store={store}>
          <App id={APP_ID}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </App>
        </Provider>
      </PostHogHoC>
    </StrictMode>
  );
}
