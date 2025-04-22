import type { Meta, StoryObj } from "@storybook/react";
import { CardOption } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardOption> = {
  title: "Dashboard/Report/Cards/CardOption",
  component: CardOption,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof CardOption>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: { counter: 364, title: "All issues" }
};

export const High: Story = {
  args: { counter: 364, title: "All issues", type: "high" }
};

export const Medium: Story = {
  args: { counter: 364, title: "All issues", type: "medium" }
};

export const Low: Story = {
  args: { counter: 364, title: "All issues", type: "low" }
};

export const Success: Story = {
  args: { counter: 364, title: "All issues", type: "success" }
};
