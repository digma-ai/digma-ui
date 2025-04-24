import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from ".";
import { BottleneckIcon } from "../icons/BottleneckIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tag> = {
  title: "common/Tag",
  component: Tag,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    icon: BottleneckIcon,
    value: "Input"
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/2kxQzKJFUAOUcHXvSZrMQy/Digma-Design-System-2.1?node-id=32%3A17846"
    }
  }
};

export const HighSeverity: Story = {
  args: {
    type: "highSeverity",
    value: "Input"
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/2kxQzKJFUAOUcHXvSZrMQy/Digma-Design-System-2.1?node-id=32%3A17846"
    }
  }
};

export const MediumSeverity: Story = {
  args: {
    type: "mediumSeverity",
    value: "Input"
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/2kxQzKJFUAOUcHXvSZrMQy/Digma-Design-System-2.1?node-id=32%3A17846"
    }
  }
};

export const LowSeverity: Story = {
  args: {
    type: "lowSeverity",
    value: "Input"
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/2kxQzKJFUAOUcHXvSZrMQy/Digma-Design-System-2.1?node-id=32%3A17846"
    }
  }
};
