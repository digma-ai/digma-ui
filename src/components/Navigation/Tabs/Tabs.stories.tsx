import { Meta, StoryObj } from "@storybook/react";

import { Tabs } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
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
    tabs: [
      {
        title: "",
        id: "/highlights",
        isSelected: true,
        isDisabled: false,
        hasNewData: false,
        isHidden: false,
        cardName: "highlights"
      },
      {
        title: "Insights",
        id: "/insights",
        isSelected: false,
        isDisabled: false,
        hasNewData: false,
        isHidden: false,
        cardName: "insights"
      },
      {
        title: "Assets",
        id: "/assets",
        isSelected: false,
        isDisabled: false,
        hasNewData: true,
        isHidden: false,
        cardName: "assets"
      },
      {
        title: "Errors",
        id: "/errors",
        isSelected: false,
        isDisabled: false,
        hasNewData: false,
        isHidden: false,
        cardName: "errors"
      },
      {
        title: "Tests",
        id: "/tests",
        isSelected: false,
        isDisabled: true,
        hasNewData: false,
        isHidden: false,
        cardName: "tests"
      }
    ]
  }
};
