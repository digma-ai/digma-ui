import { Meta, StoryObj } from "@storybook/react";
import { NoUser } from ".";

const meta: Meta<typeof NoUser> = {
  title: "Recent Activity/NoUser",
  component: NoUser,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
