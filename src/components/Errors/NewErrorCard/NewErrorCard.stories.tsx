import { Meta, StoryObj } from "@storybook/react";

import { NewErrorCard } from ".";
import { mockedGlobalErrorData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NewErrorCard> = {
  title: "Errors/NewErrorCard",
  component: NewErrorCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockedGlobalErrorData
  }
};

export const Critical: Story = {
  args: {
    data: {
      ...mockedGlobalErrorData,
      score: {
        ...mockedGlobalErrorData.score,
        score: 100
      }
    }
  }
};
