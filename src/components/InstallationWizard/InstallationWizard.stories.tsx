import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InstallationWizard } from ".";

export default {
  title: "Installation Wizard/InstallationWizard",
  component: InstallationWizard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof InstallationWizard>;

const Template: ComponentStory<typeof InstallationWizard> = () => (
  <InstallationWizard />
);

export const Default = Template.bind({});
Default.args = {};
