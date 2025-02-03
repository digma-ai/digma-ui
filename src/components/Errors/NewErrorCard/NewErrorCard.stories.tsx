import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
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
    onPinStatusChange: fn(),
    data: mockedGlobalErrorData
  }
};

export const Critical: Story = {
  args: {
    onPinStatusChange: fn(),
    data: {
      ...mockedGlobalErrorData,
      score: {
        ...mockedGlobalErrorData.score,
        score: 100
      }
    }
  }
};

export const Pinned: Story = {
  args: {
    data: {
      ...mockedGlobalErrorData,
      pinnedAt: "2024-10-06T12:57:46.864939Z"
    }
  }
};
