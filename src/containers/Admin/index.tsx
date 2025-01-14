import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { sendMessage } from "../../api";
import { App } from "../../components/common/App";
import { router } from "./router";
import { store } from "./store";

const APP_ID = "admin";

const rootElement = document.getElementById("root");

// TODO: make not required and remove
window.sendMessageToDigma = sendMessage;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App id={APP_ID}>
          <RouterProvider router={router} />
        </App>
      </Provider>
    </StrictMode>
  );
}
