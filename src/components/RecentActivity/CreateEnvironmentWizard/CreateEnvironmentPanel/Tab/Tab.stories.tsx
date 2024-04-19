import { Meta, StoryObj } from "@storybook/react";
import { Tab } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tab> = {
  title: "Recent Activity/CreateEnvironmentPanel/Tab",
  component: Tab,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Active: Story = {
  args: {
    index: 1,
    name: "Environment Name",
    state: "active"
  }
};

export const Pending: Story = {
  args: {
    index: 1,
    name: "Environment Name",
    state: "not-completed"
  }
};

export const Confirmed: Story = {
  args: {
    index: 1,
    name: "Environment Name",
    state: "completed"
  }
};

export const Error: Story = {
  args: {
    index: 1,
    name: "Environment Name",
    state: "error"
  }
};
