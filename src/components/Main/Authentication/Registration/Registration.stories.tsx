import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Registration } from ".";
import { actions } from "../../../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Registration> = {
  title: "Main/Authentication/Registration",
  component: Registration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Registration>;

export const Default: Story = {};

export const Failed: Story = {
  play: () => {
    window.setTimeout(
      () =>
        window.postMessage({
          type: "digma",
          action: actions.SET_REGISTRATION_RESULT,
          payload: {
            errors: [
              {
                errorCode: "Invalid password",
                description: "Pls enter valid password"
              }
            ]
          }
        }),
      1000
    );
  }
};
