import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Assets } from ".";
import { data } from "./mockData";
import { AssetsProps } from "./types";

export default {
  title: "Assets/Assets",
  component: Assets,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Assets>;

const Template: ComponentStory<typeof Assets> = (args: AssetsProps) => (
  <Assets {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data
};
