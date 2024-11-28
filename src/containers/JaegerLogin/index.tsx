import { createRoot } from "react-dom/client";
import { App } from "../../components/common/App";
import { JaegerLogin } from "../../components/JaegerLogin";

const APP_ID = "jaegerLogin";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <App id={APP_ID}>
      <JaegerLogin />
    </App>
  );
}
