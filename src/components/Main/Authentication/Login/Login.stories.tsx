import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Login } from ".";
import { actions } from "../../../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Login> = {
  title: "Main/Authentication/Login",
  component: Login,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {};

export const WithSuccessMessage: Story = {
  args: {
    successMessage: "Message"
  }
};

export const Failed: Story = {
  play: () => {
    window.setTimeout(
      () =>
        window.postMessage({
          type: "digma",
          action: actions.SET_LOGIN_RESULT,
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
