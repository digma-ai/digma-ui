import type { Meta, StoryObj } from "@storybook/react";

import { HighlightCard } from ".";
import { mockedTopIssuesData } from "../../mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HighlightCard> = {
  title: "Highlights/TopIssues/common/HighlightCard",
  component: HighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    highlight: mockedTopIssuesData.topInsights[0]
  }
};
