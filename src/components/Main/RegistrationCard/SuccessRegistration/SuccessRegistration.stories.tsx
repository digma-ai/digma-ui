import { Meta, StoryObj } from "@storybook/react";
import { SuccessRegistration } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SuccessRegistration> = {
  title: "Main/RegistrationCard/SuccessRegistration",
  component: SuccessRegistration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
