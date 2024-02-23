import { Meta, StoryObj } from "@storybook/react";
import { KeyValue, KeyValueContainer } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof KeyValueContainer> = {
  title: "common/v3/KeyValueContainer",
  component: KeyValueContainer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <KeyValueContainer>
        <KeyValue label="Tested concurrency">31</KeyValue>
        <KeyValue label="Duration">5.01 sec - 223.42 sec</KeyValue>
      </KeyValueContainer>
    );
  }
};
