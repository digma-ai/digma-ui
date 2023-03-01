import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RecentActivity } from ".";

export default {
  title: "Recent Activity/RecentActivity",
  component: RecentActivity,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
} as ComponentMeta<typeof RecentActivity>;

const Template: ComponentStory<typeof RecentActivity> = () => (
  <RecentActivity />
);

export const Empty = Template.bind({});
Empty.args = {};
