/// <reference types="../src/globals" />

import { StoryFn } from "@storybook/react";
import React from "react";
import {
  cancelMessage,
  initializeDigmaMessageListener,
  sendMessage
} from "../src/api";
import { App } from "../src/components/App";
import { dispatcher } from "../src/dispatcher";

export const decorators = [
  (Story: StoryFn): JSX.Element => {
    initializeDigmaMessageListener(dispatcher);
    window.sendMessageToDigma = sendMessage;
    window.cancelMessageToDigma = cancelMessage;

    return (
      <App>
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
