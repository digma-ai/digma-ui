import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";
import { JiraLogoIcon } from "../../../../../../../common/icons/16px/JiraLogoIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/IconButton",
  component: IconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: {
      component: JiraLogoIcon
    }
  }
};

export const Disabled: Story = {
  args: {
    icon: {
      component: JiraLogoIcon
    },
    isDisabled: true
  }
};
