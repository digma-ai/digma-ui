import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { sendMessage } from "../../api";
import { App } from "../../components/common/App";
import { PostHogHoC } from "../../components/common/PostHogHoC";
import { ProductFruitsRenderer } from "../../components/common/ProductFruitsRenderer";
import posthog from "../../posthog";
import { isString } from "../../typeGuards/isString";
import { handleUncaughtError } from "../../utils/handleUncaughtError";
import { APP_ID } from "./constants";
import { router } from "./router";
import { store } from "./store";
import { GlobalStyle } from "./styles";

posthog?.register({ app: APP_ID });

window.addEventListener("error", (e) => {
  handleUncaughtError(APP_ID, e);
});

// TODO: make not required and remove
window.sendMessageToDigma = sendMessage;

const rootElement = document.getElementById("root");

const productFruitsWorkspaceCode = isString(window.productFruitsWorkspaceCode)
  ? window.productFruitsWorkspaceCode
  : undefined;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <PostHogHoC client={posthog}>
        <Provider store={store}>
          <ProductFruitsRenderer workspaceCode={productFruitsWorkspaceCode} />
          <App id={APP_ID}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </App>
        </Provider>
      </PostHogHoC>
    </StrictMode>
  );
}
