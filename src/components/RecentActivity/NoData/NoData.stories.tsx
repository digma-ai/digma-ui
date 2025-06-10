import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NoData } from ".";

const meta: Meta<typeof NoData> = {
  title: "Recent Activity/NoData",
  component: NoData,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof NoData>;

export const Default: Story = {};
