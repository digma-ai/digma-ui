import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { HotSpotHighlightCard } from ".";
import { mockedHotSpotHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HotSpotHighlightCard> = {
  title: "Highlights/TopIssues/highlightCards/HotSpotHighlightCard",
  component: HotSpotHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof HotSpotHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedHotSpotHighlightData
  }
};
