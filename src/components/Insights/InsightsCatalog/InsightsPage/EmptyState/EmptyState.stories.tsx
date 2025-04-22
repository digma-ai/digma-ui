import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EmptyState> = {
  title: "Insights/InsightsCatalog/InsightsPage/EmptyState",
  component: EmptyState,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const NoFilteredData: Story = {
  args: {
    preset: "noFilteredData"
  }
};

export const NoSearchResults: Story = {
  args: {
    preset: "noSearchResults"
  }
};

export const NoDismissedData: Story = {
  args: {
    preset: "noDismissedData"
  }
};

export const NoInsightsYet: Story = {
  args: {
    preset: "noInsightsYet"
  }
};

export const NoSpanDataYet: Story = {
  args: {
    preset: "noSpanDataYet"
  }
};

export const AnalyticsSelectAsset: Story = {
  args: {
    preset: "analyticsSelectAsset"
  }
};

export const NoDataYet: Story = {
  args: {
    preset: "noDataYet"
  }
};
