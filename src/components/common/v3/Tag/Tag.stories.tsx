import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from ".";
import { BottleneckIcon } from "../../icons/BottleneckIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tag> = {
  title: "common/v3/Tag",
  component: Tag,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: <BottleneckIcon size={16} />
  }
};

export const HighlightString: Story = {
  args: {
    type: "highlight",
    content: <span>~30ms</span>
  }
};

export const HighSeverity: Story = {
  args: {
    type: "highSeverity",
    content: <span>input</span>
  }
};

export const MediumSeverity: Story = {
  args: {
    type: "mediumSeverity",
    content: <span>input</span>
  }
};

export const LowSeverity: Story = {
  args: {
    type: "lowSeverity",
    content: <span>Input</span>
  }
};

export const Success: Story = {
  args: {
    type: "success",
    content: <span>10ms</span>
  }
};
