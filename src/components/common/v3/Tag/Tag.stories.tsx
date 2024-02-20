import { Meta, StoryObj } from "@storybook/react";
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
    icon: BottleneckIcon
  },
  parameters: {
    design: {
      type: "figma"
    }
  }
};

export const HighlighNumber: Story = {
  args: {
    type: "highlight",
    value: 30
  },
  parameters: {
    design: {
      type: "figma"
    }
  }
};

export const HighlightString: Story = {
  args: {
    type: "highlight",
    value: "~30ms"
  },
  parameters: {
    design: {
      type: "figma"
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
      type: "figma"
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
      type: "figma"
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
      type: "figma"
    }
  }
};

export const Success: Story = {
  args: {
    type: "success",
    value: "100ms"
  },
  parameters: {
    design: {
      type: "figma"
    }
  }
};
