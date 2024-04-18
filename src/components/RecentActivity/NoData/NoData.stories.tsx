import { Meta, StoryObj } from "@storybook/react";
import { NoData } from ".";

const meta: Meta<typeof NoData> = {
  title: "Recent Activity/NoData",
  component: NoData,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
