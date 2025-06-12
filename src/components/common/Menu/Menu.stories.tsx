import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Menu } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Menu> = {
  title: "common/Menu",
  component: Menu,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    title: "Title",
    items: [
      {
        label: "Item 1",
        value: "item_1"
      },
      {
        label: "Item 2",
        value: "item_2"
      },
      {
        label: "Item 3",
        value: "item_3"
      }
    ]
  }
};
