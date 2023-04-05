import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ToggleSwitch } from ".";
import { ToggleSwitchProps } from "./types";

export default {
  title: "Common/ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (
  args: ToggleSwitchProps
) => <ToggleSwitch {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Click here",
  checked: false
};
