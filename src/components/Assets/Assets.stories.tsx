import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Assets } from ".";

export default {
  title: "Assets/Assets",
  component: Assets,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Assets>;

const Template: ComponentStory<typeof Assets> = () => <Assets />;

export const Default = Template.bind({});
Default.args = {};
