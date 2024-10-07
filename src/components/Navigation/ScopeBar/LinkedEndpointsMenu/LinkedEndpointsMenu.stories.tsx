import { Meta, StoryObj } from "@storybook/react";

import { LinkedEndpointsMenu } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LinkedEndpointsMenu> = {
  title: "Navigation/ScopeBar/LinkedEndpointsMenu",
  component: LinkedEndpointsMenu,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

export const Default: StoryObj = {
  args: {
    endpoints: [
      {
        spanCodeObjectId: "span:codeObject",
        displayName: "testMethodCall",
        environment: "TEST"
      },
      {
        spanCodeObjectId: "span:codeObject2",
        displayName: "restMethodCall",
        environment: "local"
      }
    ]
  }
};
