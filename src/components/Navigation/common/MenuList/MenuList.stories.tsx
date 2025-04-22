import type { Meta, StoryObj } from "@storybook/react";
import { MenuList } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MenuList> = {
  title: "Navigation/common/MenuList",
  component: MenuList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof MenuList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Item 1",
        isDisabled: false
      },
      {
        id: "2",
        label: "Item 2",
        isDisabled: false
      },
      {
        id: "3",
        customContent: <div>Item 3</div>,
        isDisabled: true
      }
    ]
  }
};
