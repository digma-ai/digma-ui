import { Meta, StoryObj } from "@storybook/react";
import { EnvironmentInstructionsPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentInstructionsPanel> = {
  title: "Recent Activity/EnvironmentInstructionsPanel",
  component: EnvironmentInstructionsPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Private: Story = {
  args: {
    environment: {
      name: "MY_ENV",
      id: "MY_ENV#ID#1",
      isPending: true,
      hasRecentActivity: false,
      type: "Private",
      token: null,
      serverApiUrl: null,
      isOrgDigmaSetupFinished: false
    }
  }
};

export const Public: Story = {
  args: {
    environment: {
      name: "MY_ENV",
      id: "MY_ENV#ID#1",
      isPending: true,
      hasRecentActivity: false,
      type: "Public",
      token: "token_string",
      serverApiUrl: "https://example.com:80",
      isOrgDigmaSetupFinished: false
    }
  }
};
