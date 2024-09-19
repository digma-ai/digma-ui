import { Meta, StoryObj } from "@storybook/react";
import { EnvironmentTab } from ".";
import { ExtendedEnvironment } from "../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentTab> = {
  title: "Recent Activity/EnvironmentPanel/EnvironmentTab",
  component: EnvironmentTab,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;
const env: ExtendedEnvironment = {
  name: "ENV_RENDER",
  id: "ENV_RENDER#ID#1",
  isPending: false,
  type: "Public",
  token: null,
  serverApiUrl: null,
  isOrgDigmaSetupFinished: false,
  hasRecentActivity: false
};

export const Default: Story = {
  args: {
    environment: env
  }
};

export const DefaultWithRecentActivity: Story = {
  args: {
    environment: {
      ...env,
      hasRecentActivity: true
    }
  }
};
