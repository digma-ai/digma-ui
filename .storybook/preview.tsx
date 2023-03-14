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

export const decorators = [
  (Story: StoryFn, context: { globals: { theme: Mode } }): JSX.Element => {
    const theme = context.globals.theme;
    initializeDigmaMessageListener(dispatcher);
    window.sendMessageToDigma = sendMessage;
    window.cancelMessageToDigma = cancelMessage;

    return (
      <App theme={theme}>
        <Story />
      </App>
    );
  }
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Theme",
    toolbar: {
      title: "Theme",
      items: THEMES
    }
  }
};
