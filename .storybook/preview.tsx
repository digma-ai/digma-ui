import type { Preview } from "@storybook/react";
import { StoryFn } from "@storybook/react";
import React from "react";
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
      // TODO: Fix types
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const theme = context.globals.theme as Mode;
      initializeDigmaMessageListener(dispatcher);
      window.sendMessageToDigma = sendMessage;
      window.cancelMessageToDigma = cancelMessage;

      return (
        <App theme={theme}>
          <Story />
        </App>
      );
    }
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
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
