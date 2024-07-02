import { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Overlay } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Overlay> = {
  title: "common/Overlay",
  component: Overlay,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  render: (args) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(true);
    const handleClose = () => {
      setIsOverlayOpen(false);
    };

    return (
      <>
        <div>Content</div>
        {isOverlayOpen && (
          <Overlay {...args} onClose={handleClose} tabIndex={0}>
            <div>Overlay content</div>
          </Overlay>
        )}
      </>
    );
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
