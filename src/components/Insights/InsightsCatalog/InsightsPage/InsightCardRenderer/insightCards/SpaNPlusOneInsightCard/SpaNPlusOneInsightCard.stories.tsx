import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SpaNPlusOneInsightCard } from ".";
import { mockedSpaNPlusOneInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpaNPlusOneInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpaNPlusOneInsightCard",
  component: SpaNPlusOneInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SpaNPlusOneInsightCard>;

export const Default: Story = {
  args: {
    insight: mockedSpaNPlusOneInsight
  }
};

export const LinkedJira: Story = {
  args: {
    insight: { ...mockedSpaNPlusOneInsight, ticketLink: "https://digma.ai/1" }
  }
};

export const RepeatedQuery: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      subType: "repeatedQueries"
    }
  }
};

export const RepeatedInserts: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      subType: "repeatedInserts"
    }
  }
};
