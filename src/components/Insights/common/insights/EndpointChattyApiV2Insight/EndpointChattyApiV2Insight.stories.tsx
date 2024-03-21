import { Meta, StoryObj } from "@storybook/react";
import { EndpointChattyApiV2Insight } from ".";
import { mockedEndpointChattyApiV2Insight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointChattyApiV2Insight> = {
  title: "Insights/common/insights/EndpointChattyApiV2Insight",
  component: EndpointChattyApiV2Insight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointChattyApiV2Insight
  }
};
