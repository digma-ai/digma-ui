import { Meta, StoryObj } from "@storybook/react";

import { AssetsViewScopeConfiguration } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetsViewScopeConfiguration> = {
  title: "Assets/AssetsViewConfiguration",
  component: AssetsViewScopeConfiguration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentScope: {
      span: {
        displayName: "displayName",
        spanCodeObjectId: "spanCodeObjectId",
        serviceName: null,
        role: "Entry"
      },
      code: {
        relatedCodeDetailsList: [],
        codeDetailsList: []
      },
      hasErrors: false,
      totalQueryResultCount: 0,
      analyticsInsightsCount: 0,
      unreadInsightsCount: 0
    },
    assetsCount: 1,
    onAssetViewChange: () => {
      return undefined;
    }
  }
};
