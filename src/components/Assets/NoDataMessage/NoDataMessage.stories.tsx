import { Meta, StoryObj } from "@storybook/react";

import { NoDataMessage } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NoDataMessage> = {
  title: "Assets/NoDataMessage",
  component: NoDataMessage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Loading: Story = {
  args: {
    type: "loading"
  }
};

export const NoDataYet: Story = {
  args: {
    type: "noDataYet"
  }
};

export const NoSearchResults: Story = {
  args: {
    type: "noSearchResults"
  }
};
