import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NavMenuItem } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NavMenuItem> = {
  title: "Admin/Admin/Sidebar/NavMenuItem",
  component: NavMenuItem,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof NavMenuItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    item: {
      id: "home",
      name: "Home",
      route: "/home"
    }
  }
};
