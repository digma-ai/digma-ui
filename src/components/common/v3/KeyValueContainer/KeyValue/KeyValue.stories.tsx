import { Meta, StoryObj } from "@storybook/react";
import { KeyValue } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof KeyValue> = {
  title: "common/v3/KeyValue",
  component: KeyValue,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <KeyValue label="label"> Value</KeyValue>;
  }
};