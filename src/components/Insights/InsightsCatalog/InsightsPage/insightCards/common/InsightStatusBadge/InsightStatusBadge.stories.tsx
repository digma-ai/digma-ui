import { Meta, StoryObj } from "@storybook/react";
import { InsightStatusBadge } from ".";
import { InsightStatus } from "../../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightStatusBadge> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/InsightHeader/InsightStatusBadge",
  component: InsightStatusBadge,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    status: InsightStatus.Active
  }
};

export const Evaluating: Story = {
  args: {
    status: InsightStatus.InEvaluation
  }
};
export const PossiblyFixed: Story = {
  args: {
    status: InsightStatus.PossiblyFixed
  }
};
export const Regression: Story = {
  args: {
    status: InsightStatus.Regression
  }
};
