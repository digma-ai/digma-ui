import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Menu } from ".";
import { MenuProps } from "./types";

export default {
  title: "Common/Menu",
  component: Menu,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args: MenuProps) => (
  <Menu {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};
