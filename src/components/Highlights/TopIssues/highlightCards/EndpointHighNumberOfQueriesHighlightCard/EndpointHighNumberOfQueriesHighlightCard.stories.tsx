import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointHighNumberOfQueriesHighlightCard } from ".";
import { mockedEndpointHighNumberOfQueriesHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointHighNumberOfQueriesHighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/EndpointHighNumberOfQueriesHighlightCard",
  component: EndpointHighNumberOfQueriesHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointHighNumberOfQueriesHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointHighNumberOfQueriesHighlightData
  }
};
