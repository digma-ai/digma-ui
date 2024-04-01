import { Meta, StoryObj } from "@storybook/react";
import { NPlusOneEndpoints } from ".";
import { mockedSpaNPlusOneInsight } from "../../../InsightsCatalog/InsightsPage/insightCards/SpaNPlusOneInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NPlusOneEndpoints> = {
  title: "Insights/insightTickets/common/NPlusOneEndpoints",
  component: NPlusOneEndpoints,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight
    }
  }
};

export const WithoutInsight: Story = {};

export const WithoutAffectedEndpoints: Story = {
  args: {
    insight: {
      ...mockedSpaNPlusOneInsight,
      endpoints: []
    }
  }
};
