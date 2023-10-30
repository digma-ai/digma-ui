import { Meta, StoryObj } from "@storybook/react";

import { AssetTypeList } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetTypeList> = {
  title: "Assets/AssetTypeList",
  component: AssetTypeList,
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
    data: {
      assetCategories: [
        {
          name: "Other",
          count: 11
        },
        {
          name: "Endpoint",
          count: 20
        },
        {
          name: "EndpointClient",
          count: 20
        },
        {
          name: "DatabaseQueries",
          count: 7
        },
        {
          name: "CodeLocation",
          count: 13
        },
        {
          name: "Consumer",
          count: 0
        }
      ]
    }
  }
};
