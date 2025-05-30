import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PromptInput } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PromptInput> = {
  title: "Agentic/IncidentDetails/Chat/PromptInput",
  component: PromptInput,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof PromptInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
      setValue("");
    };

    return (
      <PromptInput
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
      />
    );
  },
  args: {
    isSubmitting: true
  }
};
