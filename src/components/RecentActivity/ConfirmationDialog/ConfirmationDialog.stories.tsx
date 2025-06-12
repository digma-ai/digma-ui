import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ConfirmationDialog } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ConfirmationDialog> = {
  title: "Recent Activity/ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DeleteEnvironment: Story = {
  args: {
    title: "Delete environment",
    content: "Are you sure that you want to delete this environment?",
    confirmButtonText: "Delete"
  }
};

export const ClearEnvironmentData: Story = {
  args: {
    title: "Clear Data?",
    content: (
      <>
        <span>Are you sure you want to clear the data from</span>
        <span>this environment? This action cannot be undone.</span>
      </>
    )
  }
};
