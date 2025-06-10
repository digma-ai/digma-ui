import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TextField } from ".";
import { DigmaLogoIcon } from "../../icons/DigmaLogoIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
  title: "common/v3/TextField",
  component: TextField,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    value: "some text"
  }
};

export const WithInputEndContent: Story = {
  args: {
    value: "some text",
    inputEndContent: <DigmaLogoIcon />
  }
};
