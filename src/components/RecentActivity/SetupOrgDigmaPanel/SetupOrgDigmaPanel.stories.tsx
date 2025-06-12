import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SetupOrgDigmaPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SetupOrgDigmaPanel> = {
  title: "Recent Activity/SetupOrgDigmaPanel",
  component: SetupOrgDigmaPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SetupOrgDigmaPanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    environment: {
      name: "MY_ENV",
      id: "MY_ENV",
      hasRecentActivity: false,
      type: "Public",
      token: "token_string",
      serverApiUrl: "https://example.com:80",
      isOrgDigmaSetupFinished: false,
      additionToConfigResult: null
    }
  }
};
