import { Meta, StoryObj } from "@storybook/react";
import { Registration } from ".";
import { actions } from "../../../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Registration> = {
  title: "Main/Registration",
  component: Registration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Failed: Story = {
  args: {},
  play: () => {
    setTimeout(
      () =>
        window.postMessage({
          type: "digma",
          action: actions.REGISTRATION_RESULT,
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
