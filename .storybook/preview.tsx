import type { Preview, StoryFn } from "@storybook/react";
// TODO: remove React import due to new JSX transform
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-remix-react-router";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../src/api";
import { App, THEMES } from "../src/components/common/App";
import { dispatcher } from "../src/dispatcher";
import type { Theme } from "../src/globals";
import { store } from "./store";

const preview: Preview = {
  decorators: [
    withRouter,
    (Story: StoryFn, context): JSX.Element => {
      const [isInitialized, setIsInitialized] = useState(false);
      const theme = context.globals.theme as Theme;

      useEffect(() => {
        const removeDigmaMessageListener =
          initializeDigmaMessageListener(dispatcher);
        window.sendMessageToDigma = sendMessage;
        window.cancelMessageToDigma = cancelMessage;
        setIsInitialized(true);

        return () => {
          removeDigmaMessageListener();
        };
      }, []);

      return isInitialized ? (
        <Provider store={store}>
          <App theme={theme}>
            <Story />
          </App>
        </Provider>
      ) : (
        <>Initializing...</>
      );
    }
  ],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Theme",
      toolbar: {
        title: "Theme",
        items: THEMES
      }
    }
  }
};

export default preview;
