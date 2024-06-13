import type { Preview } from "@storybook/react";
import { StoryFn } from "@storybook/react";
// TODO: remove React import due to new JSX transform
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../src/api";
import { App, THEMES } from "../src/components/common/App";
import { dispatcher } from "../src/dispatcher";
import { Mode } from "../src/globals";

const preview: Preview = {
  decorators: [
    (Story: StoryFn, context): JSX.Element => {
      const [isInitialized, setIsInitialized] = useState(false);
      const theme = context.globals.theme as Mode;

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
        <App theme={theme}>
          <Story />
        </App>
      ) : (
        <>Initializing...</>
      );
    }
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" }
  },
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
